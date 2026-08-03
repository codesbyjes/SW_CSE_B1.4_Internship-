import { useEffect, useRef, useState } from 'react'
import './SkillCard.css'

// One category card (e.g. "Programming") with a proficiency bar
// per skill inside it. The bars only animate to their width once
// the card scrolls into view.
function SkillCard({ category, skills }) {
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.25 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="royal-card skill-card" ref={cardRef}>
      <h3>{category}</h3>
      <div className="skill-list">
        {skills.map((skill) => (
          <div className="skill-row" key={skill.name}>
            <div className="skill-row-label">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="skill-bar-track">
              <div
                className="skill-bar-fill"
                style={{ width: visible ? `${skill.level}%` : '0%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillCard
