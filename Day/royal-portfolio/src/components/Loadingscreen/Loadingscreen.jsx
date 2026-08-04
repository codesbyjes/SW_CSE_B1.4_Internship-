import { useEffect, useMemo, useRef, useState } from 'react'
import './LoadingScreen.css'

const RING_RADIUS = 68
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function LoadingScreen({ onReveal, onHandoff, onDone }) {
  const [exiting, setExiting] = useState(false)
  const [cursorActive, setCursorActive] = useState(false)
  const cursorRef = useRef(null)
  const hasEntered = useRef(false)

  const dust = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 9,
        duration: 9 + Math.random() * 9,
        driftX: (Math.random() - 0.5) * 50,
      })),
    []
  )

  const burst = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2
        const distance = 70 + Math.random() * 220
        return {
          id: i,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          persists: i % 4 === 0,
          delay: Math.random() * 0.18,
          size: 2 + Math.random() * 3,
        }
      }),
    []
  )

  useEffect(() => {
    document.body.classList.add('ls-cursor-hidden')

    function handleMove(e) {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.body.classList.remove('ls-cursor-hidden')
    }
  }, [])

  function handleEnter() {
    if (hasEntered.current) return
    hasEntered.current = true

    document.body.classList.remove('ls-cursor-hidden')
    setExiting(true)

    // Trigger reveal immediately at the start of exit transition
    onReveal?.()

    // Trigger handoff glow when particle reaches logo
    window.setTimeout(() => {
      onHandoff?.()
    }, 700)

    // Snappier complete unmount (1100ms instead of 1550ms)
    window.setTimeout(() => {
      onDone?.()
    }, 1100)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleEnter()
    }
  }

  return (
    <div
      className={`loading-screen ${exiting ? 'is-exiting' : ''}`}
      onClick={handleEnter}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Enter Jeslene Iniya's portfolio"
    >
      <div className="ls-cursor" ref={cursorRef} aria-hidden="true">
        <span className={`ls-cursor-dot ${cursorActive ? 'is-active' : ''}`} />
      </div>

      <div className="ls-backdrop" aria-hidden="true">
        <div className="ls-rays" />
        <div className="ls-dust">
          {dust.map((p) => (
            <span
              key={p.id}
              className="ls-mote"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                '--driftx': `${p.driftX}px`,
              }}
            />
          ))}
        </div>

        <div className="ls-inner-frame" />

        <CornerOrnament corner="tl" />
        <CornerOrnament corner="tr" />
        <CornerOrnament corner="bl" />
        <CornerOrnament corner="br" />
      </div>

      <div className="ls-center">
        <div className="ls-emblem">
          <div className="ls-emblem-glow" aria-hidden="true" />

          <svg className="ls-ring" viewBox="0 0 160 160" aria-hidden="true">
            <circle className="ls-ring-dotted" cx="80" cy="80" r="76" />
            <circle className="ls-ring-inner" cx="80" cy="80" r="59" />
            <circle className="ls-ring-track" cx="80" cy="80" r={RING_RADIUS} />
            <circle
              className="ls-ring-draw"
              cx="80"
              cy="80"
              r={RING_RADIUS}
              style={{ '--circ': RING_CIRCUMFERENCE }}
            />
            <g className="ls-ring-diamonds">
              <polygon points="80,6 84,10 80,14 76,10" fill="var(--ls-gold-soft)" />
              <polygon points="80,146 84,150 80,154 76,150" fill="var(--ls-gold-soft)" />
              <polygon points="6,80 10,84 14,80 10,76" fill="var(--ls-gold-soft)" />
              <polygon points="146,80 150,84 154,80 150,76" fill="var(--ls-gold-soft)" />
            </g>
          </svg>

          <div className="ls-logo-wrap">
            <img src="/logo.png" alt="JI monogram" className="ls-logo" />
            <span className="ls-shine" aria-hidden="true" />
          </div>

          <div className="ls-burst" aria-hidden="true">
            {burst.map((p) => (
              <span
                key={p.id}
                className={`ls-burst-piece ${p.persists ? 'persists' : ''}`}
                style={{
                  '--dx': `${p.dx}px`,
                  '--dy': `${p.dy}px`,
                  animationDelay: `${p.delay}s`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
              />
            ))}
            <span className="ls-travel-mote" />
          </div>
        </div>

        <p className="ls-welcome">Welcome to</p>
        <h1 className="ls-name">Jeslene Iniya&rsquo;s Portfolio</h1>

        <div
          className="ls-cta"
          onMouseEnter={() => setCursorActive(true)}
          onMouseLeave={() => setCursorActive(false)}
        >
          <p className="ls-cta-line1">Press Anywhere to</p>
          <p className="ls-cta-line2">
            <span aria-hidden="true">&#10022;</span> Step Inside <span aria-hidden="true">&#10022;</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function CornerOrnament({ corner }) {
  return (
    <svg className={`ls-corner ls-corner-${corner}`} viewBox="0 0 160 160" aria-hidden="true">
      <path
        d="M4 4 C 4 60, 36 92, 92 92"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 20 C 4 52, 28 76, 60 76"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="3 3"
      />
      <path
        d="M20 4 C 52 4, 76 28, 76 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="4" cy="4" r="3.5" fill="currentColor" />
      <circle cx="4" cy="4" r="6" fill="none" stroke="currentColor" strokeWidth="0.8" />

      <g transform="translate(92, 92)">
        <polygon points="0,-9 9,0 0,9 -9,0" fill="currentColor" opacity="0.9" />
        <polygon points="0,-5 5,0 0,5 -5,0" fill="#060405" />
      </g>
    </svg>
  )
}

export default LoadingScreen