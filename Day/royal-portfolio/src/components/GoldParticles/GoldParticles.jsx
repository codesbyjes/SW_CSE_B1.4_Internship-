import { useMemo } from 'react'
import './GoldParticles.css'

// Generates 140 layered sparks distributed across the viewport (0-100%),
// with slightly increased sizes for better ambient visibility.
function GoldParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 140 }, (_, i) => {
      // Layer distribution: 90 tiny, 35 medium glow, 15 large blurred
      let layer = 'layer-tiny'
      let size = 2 + Math.random() * 2

      if (i >= 90 && i < 125) {
        layer = 'layer-glow'
        size = 4 + Math.random() * 3
      } else if (i >= 125) {
        layer = 'layer-large'
        size = 6 + Math.random() * 4
      }

      return {
        id: i,
        left: Math.random() * 100, // horizontal position (%)
        top: Math.random() * 100, // vertical position across full screen (0-100%)
        size,
        layer,
        delay: Math.random() * 15, // staggered animation timing (s)
        duration: 12 + Math.random() * 10, // 12s - 22s for smooth visible motion
        drift: (Math.random() - 0.5) * 60, // sway distance (px)
        direction: Math.random() > 0.5 ? 1 : -1, // randomized left/right drift multiplier
      }
    })
  }, [])

  return (
    <div className="gold-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`spark ${p.layer}`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
            '--dir': p.direction,
          }}
        />
      ))}
    </div>
  )
}

export default GoldParticles