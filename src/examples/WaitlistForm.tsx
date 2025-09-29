import React, { useState } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null as string | null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'waitlist', email }),
      })

      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setEmail('')
      } else {
        setStatus(`error: ${data.error || 'unknown'}`)
      }
    } catch (err: any) {
      setStatus(`error: ${err?.message || String(err)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      <label htmlFor="waitlist-email">Email</label>
      <input
        id="waitlist-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', margin: '8px 0' }}
      />
      <button type="submit">Join Waitlist</button>
      {status && <p>{status}</p>}
    </form>
  )
}
