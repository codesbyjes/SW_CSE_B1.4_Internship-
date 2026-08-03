import { useState } from 'react'
import projects from '../data/projects.js'

function ProjectDetail({ projectId, onBack }) {
  const project = projects.find((p) => p.id === projectId)
  const [mediaFailed, setMediaFailed] = useState(false)

  if (!project) {
    return (
      <section className="project-detail-page section">
        <div className="page-container">
          <p>Project not found.</p>
          <button className="btn btn-outline" onClick={onBack}>Back to Projects</button>
        </div>
      </section>
    )
  }

  // Logs the exact path that failed to load, straight to the browser
  // console. Handy for tracking down a typo/case-mismatch between a
  // filename in projects.js and the actual file in public/projects/.
  function handleMediaError(path) {
    console.warn(`[ProjectDetail] Could not load media for "${project.title}": ${path}`)
    setMediaFailed(true)
  }

  return (
    <section className="project-detail-page section">
      <div className="page-container">
        <button className="btn btn-outline back-btn" onClick={onBack}>&larr; Back to Projects</button>

        <div className="project-hero-banner royal-card">
          {mediaFailed ? (
            <div className="project-placeholder large">{project.title.charAt(0)}</div>
          ) : project.isVideo ? (
            <video
              src={project.detailVideo}
              controls
              onError={() => handleMediaError(project.detailVideo)}
            />
          ) : (
            <img
              src={project.detailImage}
              alt={project.title}
              onError={() => handleMediaError(project.detailImage)}
            />
          )}
        </div>

        <div className="project-detail-info">
          <span className="project-card-category">{project.category}</span>
          <h2 className="section-title">{project.title}</h2>
          <p className="project-detail-description">{project.description}</p>

          <dl className="project-meta">
            {project.techStack.length > 0 && (
              <div>
                <dt>Technology</dt>
                <dd>{project.techStack.join(', ')}</dd>
              </div>
            )}
            {project.status && (
              <div>
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
            )}
            {project.role && (
              <div>
                <dt>My Role</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            {project.objective && (
              <div>
                <dt>Objective</dt>
                <dd>{project.objective}</dd>
              </div>
            )}
          </dl>

          <div className="project-detail-cta">
            {project.liveDemo && (
              <a className="btn btn-primary" href={project.liveDemo} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            )}
            {project.github && (
              <a className="btn btn-outline" href={project.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetail
