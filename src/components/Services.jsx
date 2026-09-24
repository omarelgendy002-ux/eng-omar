import { Bot, CodeXml, Globe2, Workflow } from 'lucide-react'

export default function Services({ t }) {
  const items = [
    [CodeXml, 'services.web'],
    [Globe2, 'services.interactive'],
    [Bot, 'services.ai'],
    [Workflow, 'services.automation'],
  ]
  return (
    <section className="section" id="services">
      <div className="section-heading reveal-item"><span className="section-kicker">{t('services.label')}</span><h2>{t('services.title')}</h2></div>
      <div className="service-grid">
        {items.map(([Icon, key], idx) => <article className="service-card reveal-item" key={key}><div className="service-number">0{idx + 1}</div><Icon size={24} /><h3>{t(key)}</h3><div className="service-glow" /></article>)}
      </div>
      <p className="section-note reveal-item">{t('services.note')}</p>
    </section>
  )
}
