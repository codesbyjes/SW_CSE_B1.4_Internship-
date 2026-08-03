// Not wired into navigation yet since the app uses simple state-based
// page switching rather than React Router (see App.jsx). Kept here,
// ready to use, for when Router is added later (see brief section 22).
function NotFound({ onNavigate }) {
  return (
    <section className="section">
      <div className="page-container" style={{ textAlign: 'center' }}>
        <h2 className="section-title">404</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
          This page doesn't exist.
        </p>
        <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('home')}>
          Back to Home
        </button>
      </div>
    </section>
  )
}

export default NotFound
