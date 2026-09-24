import { ArrowDownRight, MessageCircle, Send, Sparkles } from 'lucide-react'

export default function Hero({ t, onOpenAI }) {
  return (
    <section className="section hero-section" id="hero-content">
      <div className="hero-copy reveal-item">
        <div className="eyebrow"><Sparkles size={14} /> {t('hero.eyebrow')}</div>
        <h2>{t('hero.title')}</h2>
        <p className="hero-role">{t('hero.role')} · {t('hero.university')}</p>
        <p className="hero-description">{t('_profile.description')}</p>
        <div className="cta-row">
          <a className="btn primary" href="#projects">{t('hero.ctaWork')} <ArrowDownRight size={18} /></a>
          <a className="btn secondary" href="#contact">{t('hero.ctaContact')} <Send size={17} /></a>
          <button className="btn ghost" onClick={onOpenAI}><MessageCircle size={17} /> {t('hero.ctaAi')}</button>
        </div>
        <div className="hero-micro">AI · Code · Interactive Digital Experiences</div>
      </div>
    </section>
  )
}
