import SkillCard from '../components/SkillCard/SkillCard.jsx';
import GitHubStats from "../components/GitHubStats/GitHubStats";
import Timeline from "../components/Timeline/Timeline";

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
];

function Skills() {
  return (
    <section className="skills-page section compact-top">
      <div className="github-stats-wrapper">
        <GitHubStats />
      </div>

      <div className="page-container">
        <span className="section-eyebrow">Capabilities</span>

        <h2 className="section-title">Skills</h2>

        <div className="gold-divider"></div>

        <div className="skills-grid-page">
          {SKILL_CATEGORIES.map((cat) => (
            <SkillCard
              key={cat.category}
              category={cat.category}
              skills={cat.skills}
            />
          ))}
        </div>

        <Timeline />
      </div>
    </section>
  );
}

export default Skills;