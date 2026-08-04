import './Footer.css'

const YEAR = new Date().getFullYear()

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img
              className="footer-logo"
              src="/logo.png"
              alt="JI logo"
            />
          </div>
          <p>Jeslene Iniya D</p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <button onClick={() => onNavigate('home')}>Home</button>
          <button onClick={() => onNavigate('about')}>About</button>
          <button onClick={() => onNavigate('skills')}>Skills</button>
          <button onClick={() => onNavigate('projects')}>Projects</button>
          <button onClick={() => onNavigate('resume')}>Resume</button>
          <button onClick={() => onNavigate('contact')}>Contact</button>
        </nav>

        <div className="footer-socials">
          <a href="https://github.com/codesbyjes" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/jeslene-iniya-d-4a07a92b5/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:jesleneiniya@gmail.com">Email</a>
        </div>
      </div>

      <p className="footer-copyright">&copy; {YEAR} Jeslene Iniya. All rights reserved.</p>
    </footer>
  )
}

export default Footer