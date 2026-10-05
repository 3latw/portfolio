import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let interval: ReturnType<typeof setInterval> | undefined
    let delay: ReturnType<typeof setTimeout> | undefined
    const start = () => {
      clearTimeout(delay); clearInterval(interval)
      if (preference.matches) { setDisplayed(text); return }
      setDisplayed('')
      let count = 0
      delay = setTimeout(() => {
        interval = setInterval(() => {
          count += 1
          setDisplayed(text.slice(0, count))
          if (count >= text.length) clearInterval(interval)
        }, speed)
      }, startDelay)
    }
    start()
    preference.addEventListener('change', start)
    return () => { clearTimeout(delay); clearInterval(interval); preference.removeEventListener('change', start) }
  }, [text, speed, startDelay])
  return { displayed, done: displayed === text }
}
