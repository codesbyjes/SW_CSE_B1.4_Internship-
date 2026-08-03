import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import GoldParticles from './components/GoldParticles/GoldParticles.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Skills from './pages/Skills.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'
import Resume from "./components/Resume/Resume.jsx";

// This app uses simple React state to switch "pages" instead of
// React Router. That keeps things beginner-friendly for now -
// React Router can be added later (see section 22 of the brief)
// without changing how any of the page components work.

function App() {
  // Theme starts from whatever was saved last time, or 'dark' by default
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')
  const [page, setPage] = useState('home')
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  // Whenever theme changes, put it on <html data-theme="..."> so
  // our CSS variables in index.css switch, and remember it for next visit
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  function goToPage(nextPage) {
    setPage(nextPage)
    setSelectedProjectId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openProject(id) {
    setSelectedProjectId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function closeProject() {
    setSelectedProjectId(null)
  }

  function renderPage() {
    if (page === 'projects' && selectedProjectId) {
      return <ProjectDetail projectId={selectedProjectId} onBack={closeProject} />
    }
    if (page === 'about') return <About />
    if (page === 'skills') return <Skills />
    if (page === 'projects') return <Projects onOpenProject={openProject} />
    if (page === "resume") return <Resume />;
    if (page === 'contact') return <Contact />
    return <Home onNavigate={goToPage} onOpenProject={openProject} />
  }

  return (
    <div className="app-shell">
      {/* Floating gold particles sit above everything, on every page */}
      <GoldParticles theme={theme} />

      <Navbar
        activePage={page}
        onNavigate={goToPage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* key= forces React to remount this block on page change,
          which re-triggers the .page-fade animation each time */}
      <main className="app-main page-fade" key={page + (selectedProjectId || '')}>
        {renderPage()}
      </main>

      <Footer onNavigate={goToPage} />
    </div>
  )
}

export default App
