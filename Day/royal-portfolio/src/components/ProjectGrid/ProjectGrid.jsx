import { useEffect, useRef, useState } from 'react'
import ProjectCard from '../ProjectCard/ProjectCard.jsx'
import './ProjectGrid.css'

function ProjectGrid({ projects, onOpenProject }) {
  const gridRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (gridRef.current) observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`project-grid ${visible ? 'is-visible' : ''}`} ref={gridRef}>
      {projects.map((project) => (
        <div className="project-grid-item" key={project.id}>
          <ProjectCard project={project} onOpen={onOpenProject} />
        </div>
      ))}
    </div>
  )
}

export default ProjectGrid
