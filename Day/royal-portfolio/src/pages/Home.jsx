import Hero from '../components/Hero/Hero.jsx'
import GitHubStats from '../components/GitHubStats/GitHubStats.jsx'
import Timeline from '../components/Timeline/Timeline.jsx'

function Home({ onNavigate }) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <GitHubStats />
      <Timeline />
    </div>
  )
}

export default Home
