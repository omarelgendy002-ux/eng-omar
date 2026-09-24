import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import RobotIntro from './components/RobotIntro'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import AIChat from './components/AIChat'
import RequestForm from './components/RequestForm'
import ComplaintForm from './components/ComplaintForm'
import WhatsAppButton from './components/WhatsAppButton'
import PrivacyConsent from './components/PrivacyConsent'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import { profile } from './data/profile'
import { skills } from './data/skills'
import { projects } from './data/projects'
import en from './i18n/en.json'
import ar from './i18n/ar.json'


function getInitialLang() {
  const saved = localStorage.getItem('omar-lang')
  return saved === 'ar' ? 'ar' : 'en'
}

export default function App() {
  const [lang, setLang] = useState(getInitialLang)
  const [aiOpen, setAiOpen] = useState(false)
  const [requestOpen, setRequestOpen] = useState(false)
  const [complaintOpen, setComplaintOpen] = useState(false)
  const dict = lang === 'ar' ? ar : en
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('omar-lang', lang)
  }, [lang])

  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal-item')]
    if (reducedMotion) {
      els.forEach((el) => el.classList.add('revealed'))
      return undefined
    }
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); io.unobserve(entry.target) } }), { threshold: .14 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [lang, reducedMotion])

  const t = (path) => {
    if (path.startsWith('_profile.')) return path.split('.')[1] === 'description' ? (lang === 'ar' ? profile.descriptionAr : profile.description) : ''
    const parts = path.split('.')
    let cur = dict
    for (const p of parts) cur = cur?.[p]
    return cur ?? path
  }

  const skillsForLang = useMemo(() => skills.map((s) => ({ ...s, title: lang === 'ar' ? s.titleAr : s.title })), [lang])

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} t={t} onOpenAI={() => setAiOpen(true)} />
      <RobotIntro reducedMotion={reducedMotion} t={t} />
      <main>
        <Hero t={t} onOpenAI={() => setAiOpen(true)} />
        <About t={t} profile={profile} lang={lang} />
        <Skills t={t} skills={skillsForLang} />
        <Projects t={t} projects={projects} lang={lang} />
        <Services t={t} />
        <section className="section" id="assistant"><div className="contact-panel"><div className="contact-card reveal-item"><span className="section-kicker">{t('assistant.label')}</span><h3>{t('assistant.title')}</h3><p className="hero-description">{t('assistant.text')}</p><button className="btn primary" onClick={() => setAiOpen(true)}>{t('assistant.open')}</button></div><div className="action-cluster"><div className="action-card reveal-item"><strong>{t('forms.requestTitle')}</strong><p>{lang === 'ar' ? 'جهّز طلبًا كاملًا ثم افتح واتساب لإرساله يدويًا.' : 'Prepare a complete request, then open WhatsApp to send it yourself.'}</p><button className="btn secondary" onClick={() => setRequestOpen(true)}>{t('forms.requestTitle')}</button></div><div className="action-card reveal-item"><strong>{t('forms.complaintTitle')}</strong><p>{lang === 'ar' ? 'نفس الفكرة للشكاوى، بدون تخزين على الموقع.' : 'The same flow for complaints, without storing data on this site.'}</p><button className="btn secondary" onClick={() => setComplaintOpen(true)}>{t('forms.complaintTitle')}</button></div></div></div></section>
        <section className="section" id="contact"><div className="section-heading reveal-item"><span className="section-kicker">{t('contact.label')}</span><h2>{t('contact.title')}</h2></div><div className="contact-panel"><div className="contact-card reveal-item"><div className="contact-actions"><a className="contact-btn" href={profile.whatsappUrl} target="_blank" rel="noreferrer"><span>{t('contact.whatsapp')}</span><small>{profile.phone}</small></a><a className="contact-btn" href={profile.telegramUrl} target="_blank" rel="noreferrer"><span>{t('contact.telegram')}</span><small>@omarelgendyy6</small></a></div></div><div className="action-card reveal-item"><strong>{t('contact.phone')}</strong><p>{profile.phone}</p></div></div></section>
      </main>
      <Footer t={t} profile={profile} lang={lang} setLang={setLang} />
      <AIChat open={aiOpen} setOpen={setAiOpen} t={t} profile={profile} lang={lang} />
      <RequestForm open={requestOpen} setOpen={setRequestOpen} t={t} profile={profile} lang={lang} />
      <ComplaintForm open={complaintOpen} setOpen={setComplaintOpen} t={t} profile={profile} lang={lang} />
      <WhatsAppButton profile={profile} label={t('contact.whatsapp')} />
      <PrivacyConsent t={t} />
      <CustomCursor />
    </div>
  )
}
