import { useEffect, useRef, useState } from 'react'
import './Timeline.css'

const MILESTONES = [
  { year: '2025', text: 'Started B.Tech CSE' },
  { text: 'Explored programming with Python and C' },
  { text: 'Built my first project: Jes Quotes' },
  { text: 'Participated in hackathons' },
  { text: 'Worked on impactful projects and gained hands on experience' },
  { text: 'Started Web Development — HTML → CSS → JavaScript' },
  { text: 'Started React' },
  { text: 'Currently learning Full Stack Development' },
]

function Timeline() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="timeline-section section" ref={sectionRef}>
      <div className="page-container">
        <span className="section-eyebrow">Growth</span>
        <h2 className="section-title">My Journey</h2>
        <div className="gold-divider"></div>

        <ol className={`timeline ${visible ? 'is-visible' : ''}`}>
          {MILESTONES.map((item, index) => (
            <li
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              key={index}
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              <span className="timeline-dot"></span>

              <div className="timeline-content">
                {item.year && (
                  <span className="timeline-year">{item.year}</span>
                )}

                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Timeline