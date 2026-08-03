import Hero from '../components/Hero/Hero.jsx'
import GitHubStats from '../components/GitHubStats/GitHubStats.jsx'
import Timeline from '../components/Timeline/Timeline.jsx'
import CGPA from "../components/CGPA/CGPA.jsx";

function Home({ onNavigate }) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <CGPA />
      <GitHubStats />
      <Timeline />
    </div>
  )
}

export default Home
