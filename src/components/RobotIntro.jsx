import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ChevronDown, Cpu } from 'lucide-react'
import RobotScene from './RobotScene'

gsap.registerPlugin(ScrollTrigger)

export default function RobotIntro({ reducedMotion = false, t }) {
  const sectionRef = useRef()
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [robotError, setRobotError] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), reducedMotion ? 250 : 900)
    return () => window.clearTimeout(timer)
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1)
      return undefined
    }
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=1700',
      scrub: true,
      pin: true,
      onUpdate: (self) => setProgress(self.progress),
    })
    return () => trigger.kill()
  }, [reducedMotion])

  const scrollDown = () => window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth' })

  return (
    <section ref={sectionRef} className="intro" id="home">
      <div className="intro-grid" />
      <div className="intro-noise" />
      <div className={`intro-copy ${loaded ? 'show' : ''}`}>
        <div className="eyebrow"><Cpu size={15} /> {t('hero.eyebrow')}</div>
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.role')} · {t('hero.university')}</p>
      </div>
      <RobotScene progress={progress} reducedMotion={reducedMotion} onRobotError={() => setRobotError(true)} />
      <div className="intro-hud">
        <div className="hud-chip">ROBOT CORE <span>{Math.round(progress * 100)}%</span></div>
        <div className="hud-line"><span style={{ width: `${Math.max(4, progress * 100)}%` }} /></div>
        {robotError && <div className="robot-fallback-note">{t('errors.robotMissing')}</div>}
      </div>
      {progress < 0.98 && <button className="scroll-cue" onClick={scrollDown} aria-label="Scroll to enter portfolio"><ChevronDown size={18} /><span>SCROLL</span></button>}
    </section>
  )
}
