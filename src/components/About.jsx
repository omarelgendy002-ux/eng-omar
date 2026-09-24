import { BrainCircuit, GraduationCap, MapPin, UserRound } from 'lucide-react'

export default function About({ t, profile, lang }) {
  const cards = [
    [UserRound, t('about.name'), lang === 'ar' ? profile.nameAr : profile.name],
    [GraduationCap, t('about.university'), lang === 'ar' ? profile.universityAr : profile.university],
    [BrainCircuit, t('about.field'), lang === 'ar' ? profile.fieldAr : profile.field],
    [MapPin, t('about.interests'), lang === 'ar' ? profile.locationAr : profile.location],
  ]
  return (
    <section className="section" id="about">
      <div className="section-heading reveal-item"><span className="section-kicker">{t('about.label')}</span><h2>{t('about.title')}</h2></div>
      <div className="about-layout">
        <div className="portrait-card reveal-item">
          <div className="portrait-frame"><img src={profile.photo} alt={profile.name} onError={(e) => { e.currentTarget.style.opacity = '0.2' }} /></div>
          <div className="portrait-meta"><span>{lang === 'ar' ? profile.roleAr : profile.role}</span><strong>{lang === 'ar' ? profile.universityAr : profile.university}</strong></div>
        </div>
        <div className="about-side">
          <p className="lead reveal-item">{t('_profile.description')}</p>
          <div className="data-grid">
            {cards.map(([Icon, label, value]) => <article className="info-card reveal-item" key={label}><Icon size={18} /><span>{label}</span><strong>{value}</strong></article>)}
          </div>
          <div className="skill-pills reveal-item"><span>{t('about.skills')}</span>{profile.skills.map((s) => <b key={s}>{s}</b>)}</div>
        </div>
      </div>
    </section>
  )
}
