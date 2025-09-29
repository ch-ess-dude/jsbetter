import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { success: boolean; error?: string }

// Small helper to send via Resend
async function sendWithResend(from: string, to: string, subject: string, html: string, apiKey: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from, to, subject, html }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend error: ${res.status} ${text}`)
  }

  return true
}

// Fallback for SendGrid (same inputs, different API)
async function sendWithSendGrid(from: string, to: string, subject: string, html: string, apiKey: string) {
  const body = {
    personalizations: [{ to: [{ email: to }] }],
    from: { email: from },
    subject,
    content: [{ type: 'text/html', value: html }],
  }

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`SendGrid error: ${res.status} ${text}`)
  }

  return true
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const provider = process.env.EMAIL_PROVIDER || 'resend' // allow switching with env var
  const resendKey = process.env.RESEND_API_KEY
  const sendgridKey = process.env.SENDGRID_API_KEY
  const to = process.env.EMAIL_TO || 'hb685612@gmail.com'
  const from = process.env.EMAIL_FROM || 'no-reply@mydomain.com'

  try {
    const body = req.body || {}
    if (!body.type) return res.status(400).json({ success: false, error: 'Missing type' })

    let subject = ''
    let html = ''

    if (body.type === 'waitlist') {
      const email = body.email
      if (!email) return res.status(400).json({ success: false, error: 'Missing email' })

      subject = 'New Waitlist Signup'
      html = `
        <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #111;">
          <h2>New Waitlist Signup</h2>
          <p>A new user joined the waitlist with email: <strong>${escapeHtml(email)}</strong></p>
        </div>
      `
    } else if (body.type === 'contact') {
      const { name, email, subject: contactSubject, category, message } = body
      if (!name || !email || !contactSubject || !message) {
        return res.status(400).json({ success: false, error: 'Missing required contact fields' })
      }

      subject = `New Contact Message: ${contactSubject}`
      html = `
        <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #111;">
          <h2>New Contact Message: ${escapeHtml(contactSubject)}</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Category:</strong> ${escapeHtml(category || 'Unspecified')}</p>
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `
    } else {
      return res.status(400).json({ success: false, error: 'Unknown type' })
    }

    // Choose provider
    if (provider === 'resend') {
      if (!resendKey) return res.status(500).json({ success: false, error: 'Missing RESEND_API_KEY' })
      await sendWithResend(from, to, subject, html, resendKey)
    } else if (provider === 'sendgrid') {
      if (!sendgridKey) return res.status(500).json({ success: false, error: 'Missing SENDGRID_API_KEY' })
      await sendWithSendGrid(from, to, subject, html, sendgridKey)
    } else {
      return res.status(500).json({ success: false, error: 'Unsupported EMAIL_PROVIDER' })
    }

    return res.status(200).json({ success: true })
  } catch (err: any) {
    console.error('send-email error:', err)
    return res.status(500).json({ success: false, error: err?.message || String(err) })
  }
}

// very small HTML escaper to avoid accidental injection in email body
function escapeHtml(unsafe: string) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
