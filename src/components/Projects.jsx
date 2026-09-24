import { ExternalLink, Github, Layers3 } from 'lucide-react'

export default function Projects({ t, projects, lang }) {
  return (
    <section className="section" id="projects">
      <div className="section-heading reveal-item"><span className="section-kicker">{t('projects.label')}</span><h2>{t('projects.title')}</h2><p>{t('projects.note')}</p></div>
      <div className="projects-grid">
        {projects.map((project) => {
          const title = lang === 'ar' ? project.titleAr : project.title
          const description = lang === 'ar' ? project.descriptionAr : project.description
          return <article className="project-card reveal-item" key={project.id}>
            <div className="project-image"><img src={project.image} alt={title} /><span>{project.placeholder ? t('projects.placeholder') : 'Project'}</span></div>
            <div className="project-body"><h3>{title}</h3><p>{description}</p><div className="tech-row">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
              <div className="project-links">
                {project.github ? <a href={project.github} target="_blank" rel="noreferrer"><Github size={16} /> {t('projects.github')}</a> : <span className="muted-link"><Github size={16} /> {t('projects.github')}</span>}
                {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={16} /> {t('projects.demo')}</a> : <span className="muted-link"><Layers3 size={16} /> —</span>}
              </div>
            </div>
          </article>
        })}
      </div>
    </section>
  )
}
