import { useState } from 'react'
import './ProjectCard.css'

function ProjectCard({ project, onOpen }) {
  const [imgFailed, setImgFailed] = useState(false)

  function handleError() {
    // Logs the exact path that failed, so a filename/case mismatch
    // between projects.js and the actual file in public/projects/
    // is easy to spot in the browser console.
    console.warn(`[ProjectCard] Could not load cover image for "${project.title}": ${project.coverImage}`)
    setImgFailed(true)
  }

  return (
    <button className="royal-card project-card" onClick={() => onOpen(project.id)}>
      <div className="project-card-media">
        {!imgFailed ? (
          <img
            src={project.coverImage}
            alt={project.title}
            onError={handleError}
          />
        ) : (
          <div className="project-placeholder">{project.title.charAt(0)}</div>
        )}

        {/* Dark tint that hides low-res cover images by default, and
            fades away on hover to reveal the (zoomed-in) image. */}
        <div className="project-card-tint"></div>

        {/* Separate bottom scrim + title, always on top, so the title
            stays readable whether the tint above is showing or not. */}
        <div className="project-card-text">
          <span className="project-card-category">{project.category}</span>
          <h3>{project.title}</h3>
        </div>
      </div>
    </button>
  )
}

export default ProjectCard
