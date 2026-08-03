import ProjectGrid from '../components/ProjectGrid/ProjectGrid.jsx'
import projects from '../data/projects.js'

function Projects({ onOpenProject }) {
  return (
    <section className="projects-page section">
      <div className="page-container">
        <span className="section-eyebrow">Selected Work</span>
        <h2 className="section-title">Projects</h2>
        <div className="gold-divider"></div>
        <ProjectGrid projects={projects} onOpenProject={onOpenProject} />
      </div>
    </section>
  )
}

export default Projects
