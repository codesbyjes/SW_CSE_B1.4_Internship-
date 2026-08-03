import AboutSection from '../components/AboutSection/AboutSection.jsx'
import './AboutPage.css'

function About() {
  return (
    <section className="about-page section">
      <div className="page-container">
        <span className="section-eyebrow">Get to know me</span>
        <h2 className="section-title">About Me</h2>
        <div className="gold-divider"></div>
        <AboutSection />
      </div>
    </section>
  )
}

export default About
