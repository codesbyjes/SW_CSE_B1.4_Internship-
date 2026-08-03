import Hero from '../components/Hero/Hero.jsx'

import CGPA from "../components/CGPA/CGPA.jsx";

function Home({ onNavigate }) {
  return (
    <div className="home-page">
      <Hero onNavigate={onNavigate} />

      <div className="hero-extension">
        <CGPA />
      </div>

      
    </div>
  )
}

export default Home