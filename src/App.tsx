import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { profile, projects, skills } from './data'
import VideoBackground from './VideoBackground'
import { useTypewriter } from './useTypewriter'

const navItems = ['About', 'Skills', 'Projects', 'CV']
const greeting = 'Glad you stopped by. I build for the web and mobile. Now, what are we creating?'
const placeholders = ['Web experiences', 'Mobile applications', 'More to come']

function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const { displayed, done } = useTypewriter(greeting)
  const published = projects.filter(project => project.status === 'published')
  const goToSection = (event: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    event.preventDefault()
    document.body.style.overflow = ''
    setMenuOpen(false)
    requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      history.replaceState(null, '', '#' + section)
    })
  }

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > window.innerHeight - 90)
    scroll()
    window.addEventListener('scroll', scroll, { passive: true })
    return () => window.removeEventListener('scroll', scroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    navRef.current?.querySelector('a')?.focus()
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() }
      if (event.key === 'Tab') {
        const links = Array.from(navRef.current?.querySelectorAll('a') ?? [])
        const first = menuButton.current
        const last = links[links.length - 1]
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      }
    }
    const breakpoint = matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => { if (breakpoint.matches) setMenuOpen(false) }
    breakpoint.addEventListener('change', closeOnDesktop)
    document.addEventListener('keydown', keyboard)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keyboard); breakpoint.removeEventListener('change', closeOnDesktop) }
  }, [menuOpen])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target) }
    }), { threshold: .08 })
    document.querySelectorAll('[data-reveal]').forEach(element => { element.classList.add('will-reveal'); observer.observe(element) })
    return () => observer.disconnect()
  }, [])

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`header ${scrolled ? 'header-scrolled' : ''} ${menuOpen ? 'menu-active' : ''}`}>
      <a href="#home" aria-label="Alaa Tawalbeh home" className="brand" onClick={() => setMenuOpen(false)}><span>AT®</span><span className="brand-star" aria-hidden="true">✳︎</span></a>
      <nav aria-label="Main navigation" className="desktop-nav">{navItems.map((item, index) => <span key={item}><a href={'#' + item.toLowerCase()}>{item}</a>{index < navItems.length - 1 && ', '}</span>)}</nav>
      <a href="#contact" className="desktop-contact">Get in touch</a>
      <button ref={menuButton} className="hamburger" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}><span/><span/><span/></button>
    </header>
    <div ref={navRef} id="mobile-navigation" className={'mobile-overlay ' + (menuOpen ? 'is-open' : '')} inert={!menuOpen} aria-hidden={!menuOpen}>
      <nav aria-label="Mobile navigation">{navItems.map(item => <a key={item} href={'#' + item.toLowerCase()} onClick={event => goToSection(event, item.toLowerCase())}>{item}</a>)}<a className="underlined" href="#contact" onClick={event => goToSection(event, 'contact')}>Get in touch</a></nav>
    </div>
    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <VideoBackground />
        <div className="hero-content">
          <h1 className="hero-name" id="hero-title"><span>Alaa Ziad</span><span>Tawalbeh.</span></h1>
          <p className="hero-headline">{profile.headline}</p>
          <div className="hero-personal"><a href={profile.phoneHref} className="personal-link" aria-label={`Call ${profile.phone}`}><span className="personal-label">PHONE</span><span dir="ltr">{profile.phone}</span></a><a href={`mailto:${profile.email}`} className="personal-link"><span className="personal-label">EMAIL</span><span>{profile.email}</span></a><div className="hero-social"><ExternalLink href={profile.github} className="underlined">GitHub / 3latw</ExternalLink><ExternalLink href={profile.linkedin} className="underlined">LinkedIn</ExternalLink></div></div>
          <p className="typewriter" aria-hidden="true">{displayed}{!done && <span className="typing-cursor"/>}</p><span className="sr-only">{greeting}</span>
          <div className="hero-pills"><a className="pill" href="#about">A little about me</a><a className="pill" href="#skills">Explore my skills</a><a className="pill" href="#projects">What I’m building</a><a className="pill" href={profile.cvUrl} download>Download CV</a><a className="pill pill-outline" href={`mailto:${profile.email}`}>Send a hello</a></div>
        </div>
        <a href="#about" className="hero-scroll">Scroll to discover</a>
      </section>

      <div className="page-content">
        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="section-label">01 / ABOUT</div>
          <div data-reveal><h2 id="about-title">A little about<br/><span className="quiet">the person behind it.</span></h2><p className="lead">I’m Alaa Ziad Tawalbeh, a software developer focused on full stack and Flutter development.</p><p className="body-copy">A Computer Science graduate at Jordan University of Science and Technology (JUST), with a focus on building experiences for web and mobile.</p><div className="about-facts"><div><span>EDUCATION</span><p>Computer Science<br/>JUST</p></div><div><span>FOCUS</span><p>Full Stack<br/>Flutter</p></div></div><ExternalLink className="underlined" href={profile.linkedin}>More on LinkedIn</ExternalLink></div>
        </section>

        <section className="section skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading" data-reveal><span className="section-label">02 / SKILLS & TECH</span><h2 id="skills-title">Web. Mobile.<br/><span className="quiet">The space in between.</span></h2></div>
          <div className="skills-list">{skills.map(skill => <article className="skill-row" key={skill.number} data-reveal><span className="row-number">{skill.number}</span><div><span className="eyebrow">{skill.subtitle}</span><h3>{skill.name}</h3></div><div><p>{skill.description}</p><ul className="tags">{skill.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div></article>)}</div>
        </section>

        <section className="section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="projects-heading" data-reveal><div><div className="section-label">03 / PROJECTS</div><h2 id="projects-title">Still in the making.<br/><span className="quiet">Worth the wait.</span></h2></div><p>Selected work, coming soon.<br/>I’ll share it here when it’s ready.</p></div>
          <div className="projects-grid">{published.length ? published.map(project => <article className="project-card" key={project.id} data-reveal>{project.image && <img className="project-image" src={project.image} alt={project.title} loading="lazy"/>}<div className="project-details"><span className="eyebrow">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><ul className="tags">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul><div className="project-links">{project.github && <ExternalLink className="underlined" href={project.github}>GitHub</ExternalLink>}{project.live && <ExternalLink className="underlined" href={project.live}>Live project</ExternalLink>}</div></div></article>) : placeholders.map((label, index) => <article className="project-placeholder" key={label} data-reveal><div className="placeholder-top"><span>0{index + 1}</span><span className="coming-soon">Coming soon</span></div><span className="placeholder-symbol" aria-hidden="true">{['✳︎', '+', '…'][index]}</span><div className="placeholder-bottom"><h3>{label}</h3><span>IN PROGRESS</span></div></article>)}</div>
          <div className="project-footer"><p>No unfinished projects. Just a space for what’s next.</p><ExternalLink href={profile.github} className="underlined">Find me on GitHub</ExternalLink></div>
        </section>

        <section className="section cv-section" id="cv" aria-labelledby="cv-title"><div className="section-label">04 / CURRICULUM VITAE</div><div className="cv-content" data-reveal><div><h2 id="cv-title">More of<br/><span className="quiet">my background.</span></h2><div className="experience-list"><article><span>2026</span><div><h3>Software Development Trainee</h3><p>King Abdullah University Hospital</p><p>Software development, system support, technical operations, and troubleshooting.</p></div></article><article><span>2024</span><div><h3>ASP.NET Core Training</h3><p>Tuned Applications Academy</p><p>80 hours of hands-on training in MVC, Entity Framework Core, RESTful APIs, authentication, and C#.</p></div></article></div><p className="body-copy">Arabic: native · English: good</p></div><a href={profile.cvUrl} download className="pill">Download CV · PDF</a></div></section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title"><div className="section-label">05 / CONTACT</div><div data-reveal><span className="contact-star" aria-hidden="true">✳︎</span><h2 id="contact-title">Now, what are<br/>we creating?</h2><div className="contact-bottom"><p>An idea, an opportunity, or a simple hello.<br/>Let’s start a conversation.</p><div className="contact-details"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.phoneHref} dir="ltr">{profile.phone}</a></div><div className="contact-links"><ExternalLink href={profile.linkedin} className="pill">Connect on LinkedIn</ExternalLink><ExternalLink href={profile.github} className="pill pill-outline">Explore GitHub</ExternalLink></div></div></div></section>
        <footer className="footer"><a className="brand" href="#home" aria-label="Back to top">AT® <span aria-hidden="true">✳︎</span></a><p>© {new Date().getFullYear()} Alaa Ziad Tawalbeh</p><a href="#home" className="underlined">Back to top</a></footer>
      </div>
    </main>
  </>
}
