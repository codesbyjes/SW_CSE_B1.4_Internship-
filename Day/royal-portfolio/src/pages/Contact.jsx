import ContactForm from '../components/ContactForm/ContactForm.jsx'

function Contact() {
  return (
    <section className="contact-page section">
      <div className="page-container contact-layout">

        <div>
          <span className="section-eyebrow">Let's Connect</span>

          <h2 className="section-title">Contact</h2>

          <div className="gold-divider"></div>

          <p className="contact-intro">
            I'm always excited to connect with fellow learners, developers,
            and innovators. Feel free to reach out for collaborations,
            projects, or simply to talk about technology.
          </p>

          <ul className="contact-info-list">
            <li>
              <span>Email</span>
              <a href="mailto:jesleneiniya@gmail.com">
                jesleneiniya@gmail.com
              </a>
            </li>

            <li>
              <span>Location</span>
              <p>Bengaluru, Karnataka, India</p>
            </li>

            <li>
              <span>LinkedIn</span>
              <a 
                href="https://www.linkedin.com/in/jeslene-iniya-d-4a07a92b5/"
                target="_blank"
                rel="noreferrer"
              >
                My LinkedIn
              </a>
            </li>

            <li>
              <span>GitHub</span>
              <a 
                href="https://github.com/codesbyjes"
                target="_blank"
                rel="noreferrer"
              >
                My GitHub
              </a>
            </li>
          </ul>
        </div>

        <ContactForm />

      </div>
    </section>
  )
}

export default Contact