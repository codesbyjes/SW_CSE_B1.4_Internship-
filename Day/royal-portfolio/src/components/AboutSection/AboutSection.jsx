import './AboutSection.css'

const ROLES = [
  {
    title: 'Class Representative (CR)',
    detail: 'Representing my class and acting as a bridge between students and faculty at RUAS.',
  },
  {
    title: 'IIC Core Member',
    detail: 'Contributing to the Institution’s Innovation Council at RUAS by encouraging innovation, entrepreneurship, and student initiatives.',
  },
  {
    title: 'ComputeX Event Head',
    detail: 'Leading events and activities for ComputeX, the Mathematics & Computing Club in the CSE Department at RUAS.',
  },
  {
    title: 'Library Committee Student Representative',
    detail: 'Representing student interests and contributing to library-related initiatives at RUAS.',
  },
]

const INTERESTS = [
  
  'Poetry',
  'Stories',
  'Creativity',
  'Curiosity',
  'Book Lover',
  'Coffee Addict',
]

function AboutSection() {
  return (
    <div className="about-section">
      <div className="about-intro royal-card">
        <img className="about-photo" src="/Jes-dp.png" alt="Jeslene Iniya D" />
        <div>
          <p>
            Being an undergraduate CSE student, I enjoy learning new technologies, but even more than that, I enjoy creating meaningful
            projects and applying my knowledge to solve real-world problems. Throughout my first year,
            I explored several hands-on projects, beginning with my experimental Jes Quotes application.
            Later, I collaborated with my teammates during hackathons to develop an emotional support
            platform and a breast cancer prediction system.
          </p>
          <p className="about-quote">
            "The future belongs to those who believe &amp; trust in the beauty of their dreams."
            <span> — Eleanor Roosevelt</span>
          </p>
        </div>
      </div>

      <h3 className="about-subheading">Leadership &amp; Roles</h3>
      <div className="roles-grid">
        {ROLES.map((role) => (
          <div className="royal-card role-card" key={role.title}>
            <h4>{role.title}</h4>
            <p>{role.detail}</p>
          </div>
        ))}
      </div>

      <div className="royal-card beyond-coding">
        <h3 className="about-subheading">Beyond Coding</h3>
        <p>
          Beyond technology, I find inspiration in books, writing, and the people
          whose ideas encourage me to think differently. <i>The 360° Leader</i> is
          one of my favourite books, and I deeply admire Dr. A.P.J. Abdul Kalam for
          his vision, humility, and belief in learning. I also enjoy writing poetry
          and stories, which gives me a creative space beyond code. I believe that
          staying curious, creative, and open to learning is just as important as
          the technical skills we build along the way.
        </p>
        <ul className="interest-tags">
          {INTERESTS.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AboutSection
