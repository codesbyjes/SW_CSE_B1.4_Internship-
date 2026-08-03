import { useEffect, useRef, useState } from 'react'
import './CGPA.css'

// ============================================================
// ALL YOUR DATA LIVES HERE. To unlock a future semester later,
// just change its status from 'locked' to 'current' and fill in
// sgpa / credits / subjects / remark - nothing else needs to change.
//
// status: 'current' -> shows the glowing progress ring + crown, is
//         clickable, opens the results popup.
//         'locked'  -> shows a padlock, greyed out, click just
//         shakes it and shows a small "awaiting results" tooltip.
// ============================================================
const semesters = [
  {
    id: 1,
    label: 'Semester 1',
    status: 'current',
    sgpa: 9.33,
    progress: 93, // ring fill %, shown out of 100
    credits: 17,
    subjects: 5,
    remark: 'Excellent Performance',
  },
  { id: 2, label: 'Semester 2', status: 'locked' },
  { id: 3, label: 'Semester 3', status: 'locked' },
  { id: 4, label: 'Semester 4', status: 'locked' },
  { id: 5, label: 'Semester 5', status: 'locked' },
  { id: 6, label: 'Semester 6', status: 'locked' },
  { id: 7, label: 'Semester 7', status: 'locked' },
  { id: 8, label: 'Semester 8', status: 'locked' },
]

const RING_RADIUS = 52
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

// Small helper that animates a number from 0 up to `target` over
// `duration` ms, calling setValue on every frame. Plain function,
// not a hook - just called from inside useEffect below.
function animateCount(target, duration, setValue) {
  const start = performance.now()
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // ease-out
    setValue(target * eased)
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

function CGPA() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  // Which locked node's tooltip is currently open (id, or null)
  const [tooltipId, setTooltipId] = useState(null)
  // Which locked node is mid-shake right now (id, or null)
  const [shakingId, setShakingId] = useState(null)
  // Which semester's popup is open (id, or null)
  const [openId, setOpenId] = useState(null)

  const current = semesters.find((s) => s.status === 'current')
  const allComplete = semesters.every((s) => s.status !== 'locked')

  // Reveal + trigger the path-draw / ring-fill / counter animations
  // the first time this section scrolls into view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  function handleLockedClick(id) {
    setShakingId(id)
    setTimeout(() => setShakingId(null), 500)
    setTooltipId((current) => (current === id ? null : id))
  }

  return (
    <section className="cgpa-section section" ref={sectionRef}>
      <div className="page-container">
        <span className="section-eyebrow">Highlights</span>
        <h2 className="section-title">Academic Journey</h2>
        <p className="cgpa-subtitle">Semester Progress</p>
        <div className="gold-divider"></div>
      </div>

      <div className="cgpa-scroll">
        <div className={`cgpa-track ${visible ? 'is-visible' : ''}`}>
          {/* The gold connecting path, draws itself left -> right */}
          <div className="cgpa-path"></div>

          {semesters.map((sem) => (
            <div className="cgpa-node-wrap" key={sem.id}>
              {sem.status === 'current' ? (
                <CurrentNode
                  semester={sem}
                  visible={visible}
                  onClick={() => setOpenId(sem.id)}
                />
              ) : (
                <LockedNode
                  semester={sem}
                  shaking={shakingId === sem.id}
                  tooltipOpen={tooltipId === sem.id}
                  onClick={() => handleLockedClick(sem.id)}
                />
              )}
            </div>
          ))}

          {/* CGPA goal, far right */}
          <div className="cgpa-node-wrap">
            <GoalNode
              unlocked={allComplete}
              shaking={shakingId === 'goal'}
              tooltipOpen={tooltipId === 'goal'}
              onClick={() =>
                allComplete ? null : handleLockedClick('goal')
              }
            />
          </div>
        </div>
      </div>

      {current && openId === current.id && (
        <SemesterPopup semester={current} onClose={() => setOpenId(null)} />
      )}
    </section>
  )
}

// ---- Current (unlocked) semester: ring + crown + ribbon ----
function CurrentNode({ semester, visible, onClick }) {
  const [progress, setProgress] = useState(0)
  const [sgpaValue, setSgpaValue] = useState(0)

  useEffect(() => {
    if (!visible) return
    // Small delay so the path has already started drawing first
    const timer = setTimeout(() => {
      setProgress(semester.progress)
      animateCount(semester.sgpa, 1400, setSgpaValue)
    }, 350)
    return () => clearTimeout(timer)
  }, [visible, semester])

  const offset = RING_CIRCUMFERENCE * (1 - progress / 100)

  return (
    <button className="cgpa-node cgpa-node-current" onClick={onClick} aria-label={`${semester.label}, view details`}>
      <span className="cgpa-crown" aria-hidden="true">&#128081;</span>

      {/* Soft luxury particles - hidden until hover (see CSS) */}
      <span className="particle particle-heart" aria-hidden="true">&#128156;</span>
      <span className="particle particle-sparkle" aria-hidden="true">&#10024;</span>
      <span className="particle particle-diamond" aria-hidden="true">&#128142;</span>
      <span className="particle particle-heart particle-alt" aria-hidden="true">&#128156;</span>
      <span className="particle particle-sparkle particle-alt" aria-hidden="true">&#10024;</span>

      <span className="ring-glow" aria-hidden="true"></span>

      <svg className="progress-ring" viewBox="0 0 120 120">
        <circle className="ring-track" cx="60" cy="60" r={RING_RADIUS} />
        <circle
          className="ring-fill"
          cx="60"
          cy="60"
          r={RING_RADIUS}
          style={{
            strokeDasharray: RING_CIRCUMFERENCE,
            strokeDashoffset: offset,
          }}
        />
      </svg>

      <span className="cgpa-ring-value">{sgpaValue.toFixed(2)}</span>

      <span className="cgpa-ribbon" aria-hidden="true"></span>
      <span className="cgpa-node-label">{semester.label}</span>
    </button>
  )
}

// ---- Locked future semester: padlock, greyed, shake + tooltip ----
function LockedNode({ semester, shaking, tooltipOpen, onClick }) {
  return (
    <div className="cgpa-node-tooltip-anchor">
      <button
        className={`cgpa-node cgpa-node-locked ${shaking ? 'shaking' : ''}`}
        onClick={onClick}
        aria-label={`${semester.label}, locked`}
      >
        <span className="lock-icon" aria-hidden="true">&#128274;</span>
        <span className="cgpa-node-label">{semester.label}</span>
      </button>

      {tooltipOpen && (
        <div className="cgpa-tooltip">
          <strong>{semester.label}</strong>
          <span>Awaiting Results</span>
          <span className="cgpa-tooltip-muted">Unlocks after {semester.label}</span>
        </div>
      )}
    </div>
  )
}

// ---- CGPA trophy goal, far right ----
function GoalNode({ unlocked, shaking, tooltipOpen, onClick }) {
  return (
    <div className="cgpa-node-tooltip-anchor">
      <button
        className={`cgpa-node cgpa-node-goal ${unlocked ? 'unlocked' : 'locked'} ${shaking ? 'shaking' : ''}`}
        onClick={onClick}
        aria-label="CGPA goal"
      >
        <span className="trophy-icon" aria-hidden="true">&#127942;</span>
        <span className="cgpa-node-label">CGPA</span>
      </button>

      {tooltipOpen && (
        <div className="cgpa-tooltip">
          <strong>CGPA Goal</strong>
          <span>Locked</span>
          <span className="cgpa-tooltip-muted">Unlocks after every semester is complete</span>
        </div>
      )}
    </div>
  )
}

// ---- Glassmorphism popup for the current semester's results ----
function SemesterPopup({ semester, onClose }) {
  const [credits, setCredits] = useState(0)
  const [subjects, setSubjects] = useState(0)

  useEffect(() => {
    animateCount(semester.credits, 900, (v) => setCredits(Math.round(v)))
    animateCount(semester.subjects, 900, (v) => setSubjects(Math.round(v)))

    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [semester, onClose])

  return (
    <div className="cgpa-popup-backdrop" onClick={onClose}>
      <div className="cgpa-popup" onClick={(e) => e.stopPropagation()}>
        <button className="cgpa-popup-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <p className="cgpa-popup-eyebrow">{semester.label}</p>
        <p className="cgpa-popup-sgpa">{semester.sgpa.toFixed(2)}</p>

        <div className="cgpa-popup-stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="cgpa-star" style={{ animationDelay: `${0.15 * i}s` }}>
              &#9733;
            </span>
          ))}
        </div>

        <div className="cgpa-popup-stats">
          <div>
            <p className="cgpa-popup-value">{credits}</p>
            <p className="cgpa-popup-label">Credits Earned</p>
          </div>
          <div>
            <p className="cgpa-popup-value">{subjects}</p>
            <p className="cgpa-popup-label">Subjects Completed</p>
          </div>
        </div>

        <p className="cgpa-popup-remark">{semester.remark}</p>
      </div>
    </div>
  )
}

export default CGPA