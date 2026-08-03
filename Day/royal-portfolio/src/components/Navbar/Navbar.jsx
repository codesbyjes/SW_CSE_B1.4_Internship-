import { useState } from 'react'
import './Navbar.css'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

function Navbar({ activePage, onNavigate, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNavClick(id) {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    // This wrapper is the background "card" for the navbar only.
    // Drop your background image at public/navbar-bg.jpg (any name
    // is fine, just update the path below) and it will sit behind
    // the nav, above the Hero section, exactly like a banner card.
    <div className="navbar-bg-card">
      <header className="navbar">
        <button
          className="logo-mark"
          onClick={() => handleNavClick('home')}
          aria-label="Go to home"
        >
          <img src="/logo.png" alt="JI Logo" />
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle light and dark theme"
          >
            <span className={`toggle-track ${theme}`}>
              <span className="toggle-thumb">{theme === 'dark' ? '\u263D' : '\u2600'}</span>
            </span>
          </button>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </div>
  )
}

export default Navbar
