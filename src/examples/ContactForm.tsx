import React, { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('General')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null as string | null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', name, email, subject, category, message }),
      })

      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setName('')
        setEmail('')
        setSubject('')
        setCategory('General')
        setMessage('')
      } else {
        setStatus(`error: ${data.error || 'unknown'}`)
      }
    } catch (err: any) {
      setStatus(`error: ${err?.message || String(err)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />

      <label>Subject</label>
      <input value={subject} onChange={(e) => setSubject(e.target.value)} required />

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>General</option>
        <option>Bug Report</option>
        <option>Feature Request</option>
        <option>Other</option>
      </select>

      <label>Message</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />

      <button type="submit">Send Message</button>
      {status && <p>{status}</p>}
    </form>
  )
}
