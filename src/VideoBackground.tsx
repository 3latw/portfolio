import { useEffect, useRef, useState } from 'react'
import { profile } from './data'

const SENSITIVITY = .8

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const seekRef = useRef<(value: number) => void>(() => {})
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [position, setPosition] = useState(50)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let prevX: number | null = null
    let targetTime = 0
    let initialized = false
    let frame = 0
    let disposed = false
    const maxTime = () => Math.max(0, video.duration - .04)
    const seek = () => {
      frame = 0
      if (disposed || document.hidden || video.seeking || !initialized || video.readyState < 2) return
      if (Math.abs(video.currentTime - targetTime) > .025) video.currentTime = targetTime
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(seek) }
    const loaded = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) { setFailed(true); return }
      initialized = true
      video.pause()
      targetTime = maxTime() * .5
      setReady(true)
      schedule()
    }
    const mousemove = (event: MouseEvent) => {
      if (!initialized || motion.matches || window.scrollY >= window.innerHeight || document.hidden) { prevX = null; return }
      if (prevX === null) { prevX = event.clientX; return }
      const delta = event.clientX - prevX
      prevX = event.clientX
      targetTime = Math.max(0, Math.min(maxTime(), targetTime + (delta / window.innerWidth) * SENSITIVITY * video.duration))
      setPosition(targetTime / maxTime() * 100)
      schedule()
    }
    const resetPointer = () => { prevX = null }
    const visibility = () => { resetPointer(); if (!document.hidden) schedule() }
    seekRef.current = value => {
      if (!initialized) return
      targetTime = Math.max(0, Math.min(100, value)) / 100 * maxTime()
      setPosition(value)
      schedule()
    }
    video.addEventListener('loadeddata', loaded)
    video.addEventListener('seeked', schedule)
    window.addEventListener('mousemove', mousemove, { passive: true })
    window.addEventListener('blur', resetPointer)
    document.addEventListener('mouseleave', resetPointer)
    document.addEventListener('visibilitychange', visibility)
    motion.addEventListener('change', resetPointer)
    if (video.readyState >= 2) loaded()
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      video.removeEventListener('loadeddata', loaded)
      video.removeEventListener('seeked', schedule)
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('blur', resetPointer)
      document.removeEventListener('mouseleave', resetPointer)
      document.removeEventListener('visibilitychange', visibility)
      motion.removeEventListener('change', resetPointer)
      seekRef.current = () => {}
    }
  }, [])

  return <>
    <div className="video-background" aria-hidden="true">
      <video ref={videoRef} src={profile.heroVideo ?? undefined} poster={profile.heroPoster ?? undefined} muted playsInline preload="auto" onError={() => setFailed(true)} className={failed ? 'video-failed' : ''} />
      <div className="video-shade" />
    </div>
    {ready && !failed && <div className="portrait-control">
      <label htmlFor="portrait-angle"><span className="mouse-hint">Move your mouse to explore</span><span className="touch-hint">Slide to explore</span></label>
      <input id="portrait-angle" type="range" min="0" max="100" step="1" value={position} onChange={event => seekRef.current(Number(event.target.value))} aria-label="Portrait angle" aria-valuetext={`${Math.round(position)} percent`} />
    </div>}
  </>
}
