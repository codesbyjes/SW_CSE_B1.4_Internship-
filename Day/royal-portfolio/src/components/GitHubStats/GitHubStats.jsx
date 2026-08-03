import { useState, useEffect } from 'react'
import './GitHubStats.css'

const GITHUB_USERNAME = 'codesbyjes'

function GitHubStats() {
  const [repoCount, setRepoCount] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub request failed')
        return res.json()
      })
      .then((data) => {
        setRepoCount(data.public_repos)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section className="github-stats section">
      <div className="page-container">
        <span className="section-eyebrow">Snapshot</span>
        <h2 className="section-title">GitHub &amp; Development</h2>
        <div className="gold-divider"></div>

        {status === 'error' && (
          <p className="github-error">
            Couldn't load live GitHub stats right now — you can still view the profile directly below.
          </p>
        )}

        <div className="royal-card github-summary-card">
          <div className="github-summary-row">
            <div>
              <p className="github-label">GitHub Username</p>
              <p className="github-value small">@{GITHUB_USERNAME}</p>
            </div>
            <div>
              <p className="github-label">Public Repositories</p>
              <p className="github-value">
                {status === 'loading' ? '—' : (repoCount ?? '—')}
              </p>
            </div>
          </div>

          <a
            className="btn btn-primary github-visit-btn"
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
          >
            Visit GitHub Profile
          </a>
        </div>
      </div>
    </section>
  )
}

export default GitHubStats
