import SkillCard from '../components/SkillCard/SkillCard.jsx'

// Note: a dedicated Skills page wasn't in the exact folder list you
// sent, but the brief's nav bar and Skills-page spec both need one,
// so it was added here alongside the other pages/*.jsx files.

const SKILL_CATEGORIES = [
  {
    category: 'Programming',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'C', level: 85 },
    ],
  },
  {
    category: 'Web Development',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS', level: 80 },
      { name: 'JavaScript', level: 55 },
      { name: 'React', level: 30 },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', level: 80 },
      { name: 'GitHub', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Streamlit', level: 70 },
    ],
  },
  {
    category: 'Currently Learning',
    skills: [
      { name: 'React', level: 30 },
      { name: 'Full Stack Development', level: 20 },
    ],
  },
]

function Skills() {
  return (
    <section className="skills-page section">
      <div className="page-container">
        <span className="section-eyebrow">Capabilities</span>
        <h2 className="section-title">Skills</h2>
        <div className="gold-divider"></div>

        <div className="skills-grid-page">
          {SKILL_CATEGORIES.map((cat) => (
            <SkillCard key={cat.category} category={cat.category} skills={cat.skills} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
