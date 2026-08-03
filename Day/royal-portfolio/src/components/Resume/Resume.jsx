import "./Resume.css";

function Resume() {
  return (
    <section className="resume-page section">
      <div className="page-container">

        <span className="section-eyebrow">Professional Profile</span>

        <h2 className="section-title">Resume</h2>

        <div className="gold-divider"></div>

        <div className="resume-card royal-card">

          <iframe
            src="/resume.pdf"
            title="Jeslene Resume"
            className="resume-viewer"
          ></iframe>

          <div className="resume-buttons">

            <a
              href="/resume.pdf"
              download
              className="btn btn-primary"
            >
              📄 Download Resume
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Resume;