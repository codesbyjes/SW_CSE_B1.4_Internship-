import { useState, useEffect } from 'react'
import './Hero.css'

// Works out a greeting based on the current hour on the visitor's device
function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 5) return 'Good Night'
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  if (hour < 21) return 'Good Evening'
  return 'Good Night'
}

function Hero({ onNavigate }) {
  const [greeting, setGreeting] = useState('')
  // "played" turns true right after mount, so the CSS entrance
  // animations (which are triggered by a class) actually play instead
  // of just appearing instantly in their end state.
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    setGreeting(getGreeting())
    const timer = setTimeout(() => setPlayed(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" className={`hero ${played ? 'entrance' : ''}`}>
      <div className="hero-glow" aria-hidden="true"></div>

      <div className="page-container hero-inner">
        <div className="hero-text">
          
          <p className="hero-greeting">{greeting}</p>
          <h1 className="hero-name">I am Jeslene Iniya D</h1>
          <p className="hero-subtitle">
            B.Tech CSE Student at MS Ramaiah University Of Applied Sciences, Bangalore<br />
            Aspiring Software Engineer<br />
            Developer &bull; Innovator &bull; Learner
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => onNavigate('projects')}>
              Explore My Work
            </button>
            <button className="btn btn-outline" onClick={() => onNavigate('contact')}>
              Contact Me
            </button>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="ring ring-outer"></div>
          <div className="ring ring-inner"></div>
          <img
            className="hero-photo"
            src="/Jes-dp.png"
            alt="Portrait of Jeslene Iniya D"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
