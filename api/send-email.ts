import { IncomingMessage, ServerResponse } from 'http'

// Vercel / serverless-compatible handler
export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: 'Method not allowed' }))
      return
    }

    const provider = process.env.EMAIL_PROVIDER || 'resend'
    const resendKey = process.env.RESEND_API_KEY
    const sendgridKey = process.env.SENDGRID_API_KEY
    const to = process.env.EMAIL_TO || 'hb685612@gmail.com'
    const from = process.env.EMAIL_FROM || 'no-reply@mydomain.com'

    const body = req.body || {}
    if (!body.type) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: 'Missing type' }))
      return
    }

    let subject = ''
    let html = ''

    if (body.type === 'waitlist') {
      const email = body.email
      if (!email) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, error: 'Missing email' }))
        return
      }

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
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, error: 'Missing required contact fields' }))
        return
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
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: 'Unknown type' }))
      return
    }

    // Choose provider
    if (provider === 'resend') {
      if (!resendKey) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, error: 'Missing RESEND_API_KEY' }))
        return
      }
      await sendWithResend(from, to, subject, html, resendKey)
    } else if (provider === 'sendgrid') {
      if (!sendgridKey) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, error: 'Missing SENDGRID_API_KEY' }))
        return
      }
      await sendWithSendGrid(from, to, subject, html, sendgridKey)
    } else {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: 'Unsupported EMAIL_PROVIDER' }))
      return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: true }))
  } catch (err: any) {
    console.error('send-email error:', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, error: err?.message || String(err) }))
  }
}

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

function escapeHtml(unsafe: string) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
