export default function Skills({ t, skills }) {
  return (
    <section className="section" id="skills">
      <div className="section-heading reveal-item"><span className="section-kicker">{t('skills.label')}</span><h2>{t('skills.title')}</h2><p>{t('skills.note')}</p></div>
      <div className="skills-grid">
        {skills.map(({ key, icon: Icon, title, blurb, blurbAr }) => <article className="skill-card reveal-item" key={key}>
          <div className="icon-box"><Icon size={25} /></div>
          <div><h3>{title}</h3><p>{document.documentElement.lang === 'ar' ? blurbAr : blurb}</p></div>
          <div className="skill-visual" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </article>)}
      </div>
    </section>
  )
}
