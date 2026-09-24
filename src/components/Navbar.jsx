import { Menu, MessageCircle, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ lang, setLang, t, onOpenAI }) {
  const [open, setOpen] = useState(false)
  const links = ['home', 'about', 'skills', 'projects', 'services', 'contact']
  return (
    <header className="navbar-shell">
      <nav className={`navbar ${open ? 'open' : ''}`} aria-label="Primary">
        <a className="brand" href="#home" onClick={() => setOpen(false)}><span>O</span><b>OMAR</b></a>
        <div className="nav-links">
          {links.map((item) => <a key={item} href={`#${item}`} onClick={() => setOpen(false)}>{t(`nav.${item}`)}</a>)}
        </div>
        <div className="nav-actions">
          <button className="nav-ai" onClick={onOpenAI}><MessageCircle size={16} /> <span>{t('hero.ctaAi')}</span></button>
          <button className="lang-btn" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label="Switch language">{lang === 'en' ? 'العربية' : 'English'}</button>
          <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
    </header>
  )
}
