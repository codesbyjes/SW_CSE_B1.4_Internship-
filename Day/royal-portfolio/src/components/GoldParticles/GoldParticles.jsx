import { useMemo } from 'react'
import './GoldParticles.css'

// Generates a fixed set of "sparks" that float upward and fade out,
// like gold dust evaporating. We build the random values once with
// useMemo so they don't reshuffle and jump around on every re-render.
function GoldParticles() {
  const particles = useMemo(() => {
    const count = 28
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,        // horizontal position, in %
      size: 2 + Math.random() * 3,      // px
      delay: Math.random() * 10,        // seconds
      duration: 8 + Math.random() * 10, // seconds
      drift: (Math.random() - 0.5) * 60 // slight left/right sway, px
    }))
  }, [])

  return (
    <div className="gold-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="spark"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`
          }}
        />
      ))}
    </div>
  )
}

export default GoldParticles
