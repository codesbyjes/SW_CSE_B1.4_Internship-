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
import LoadingScreen from "./components/Loadingscreen/LoadingScreen.jsx";

function App() {
  // ---------------- Loading Screen ----------------
  const [showLoader, setShowLoader] = useState(true)
  const [siteRevealed, setSiteRevealed] = useState(false)
  const [navbarGlowing, setNavbarGlowing] = useState(false)

  // ---------------- Theme ----------------
  const [theme, setTheme] = useState(
    () => localStorage.getItem('portfolio-theme') || 'dark'
  )

  const [page, setPage] = useState('home')
  const [selectedProjectId, setSelectedProjectId] = useState(null)

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
      return (
        <ProjectDetail
          projectId={selectedProjectId}
          onBack={closeProject}
        />
      )
    }

    if (page === 'about') return <About />
    if (page === 'skills') return <Skills />
    if (page === 'projects')
      return <Projects onOpenProject={openProject} />
    if (page === 'resume') return <Resume />
    if (page === 'contact') return <Contact />

    return (
      <Home
        onNavigate={goToPage}
        onOpenProject={openProject}
      />
    )
  }

  return (
    <>
      {/*
        Scoped styles for the loader -> website handoff only.
        Kept inline here so nothing outside App.jsx / LoadingScreen.jsx /
        LoadingScreen.css needs to be touched. These rules only affect the
        .app-shell wrapper and a small self-contained glow element that
        stands in for "the navbar logo lighting up" — since Navbar.jsx
        isn't one of the provided files, the glow is rendered as an
        overlay positioned exactly over the navbar logo's on-screen spot
        (the same --navbar-logo-x / --navbar-logo-y coordinates the
        travelling particle in LoadingScreen.css flies toward) rather than
        reaching into Navbar's own markup.
      */}
      <style>{`
        .app-shell {
          opacity: 0;
          transform: scale(1.015);
          filter: blur(6px);
          transition:
            opacity 0.9s ease 0.15s,
            transform 0.9s ease 0.15s,
            filter 0.9s ease 0.15s;
        }

        .app-shell.site-entering {
          opacity: 1;
          transform: scale(1);
          filter: blur(0px);
        }

        .navbar-handoff-glow {
          position: fixed;
          top: var(--navbar-logo-y, 53px);
          left: var(--navbar-logo-x, 53px);
          width: 46px;
          height: 46px;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0.4);
          background: radial-gradient(
            circle,
            rgba(243, 221, 156, 0.9) 0%,
            rgba(212, 175, 55, 0.55) 45%,
            transparent 75%
          );
          opacity: 0;
          filter: blur(2px);
          pointer-events: none;
          z-index: 10000;
        }

        .app-shell.navbar-glowing .navbar-handoff-glow {
          animation: navbarHandoffGlow 2.2s ease-out forwards;
        }

        @keyframes navbarHandoffGlow {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.4);
            filter: blur(2px);
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.3);
            filter: blur(4px);
          }
          40% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(1);
            filter: blur(3px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
            filter: blur(6px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .app-shell {
            transition-duration: 0.01ms !important;
          }
          .app-shell.navbar-glowing .navbar-handoff-glow {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Loading Screen Overlay */}
      {showLoader && (
        <LoadingScreen
          onReveal={() => setSiteRevealed(true)}
          onHandoff={() => setNavbarGlowing(true)}
          onDone={() => setShowLoader(false)}
        />
      )}

      {/* Real Website - the shell is always in the DOM (so it feels
          "mounted underneath" rather than popping in), but its inner
          content only mounts once the loading screen begins its exit.
          That's what lets Home/Hero's own entrance animations (Navbar ->
          Greeting -> Name -> Subtitle -> Buttons) start fresh at exactly
          the moment the loading screen starts fading, instead of having
          already silently played out behind the loader. */}
      <div className={`app-shell ${siteRevealed ? 'site-entering' : ''} ${navbarGlowing ? 'navbar-glowing' : ''}`}>
        {siteRevealed && (
          <>
            <GoldParticles theme={theme} />

            <Navbar
              activePage={page}
              onNavigate={goToPage}
              theme={theme}
              onToggleTheme={toggleTheme}
            />

            <main
              className="app-main page-fade"
              key={page + (selectedProjectId || '')}
            >
              {renderPage()}
            </main>

            <Footer onNavigate={goToPage} />

            <span className="navbar-handoff-glow" aria-hidden="true" />
          </>
        )}
      </div>
    </>
  )
}

export default App