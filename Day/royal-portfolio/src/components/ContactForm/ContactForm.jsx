import { useState } from 'react'
import './ContactForm.css'

// Frontend-only for now, as requested - no backend is wired up yet.
// "submitted" just lets us show a friendly confirmation message.
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <form className="royal-card contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
      </div>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} required></textarea>
      </div>

      <button type="submit" className="btn btn-primary">Send Message</button>

      {submitted && <p className="form-success">Thank you — your message has been noted!</p>}
    </form>
  )
}

export default ContactForm
