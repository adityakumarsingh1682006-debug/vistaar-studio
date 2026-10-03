import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Helper function to escape HTML to prevent XSS in email
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// POST /api/contact - Secure Server-Side Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const {
      name,
      businessName,
      email,
      phone,
      businessType,
      serviceNeeded,
      message,
      honeypot, // hidden anti-spam field
    } = req.body;

    // 1. Anti-spam honeypot: bots that populate hidden fields get a fake success response
    if (honeypot && String(honeypot).trim() !== '') {
      console.warn('[Anti-Spam] Honeypot triggered, discarding spam submission silently.');
      return res.status(200).json({
        success: true,
        message: "Thanks — your project enquiry has been sent. We'll get back to you soon.",
      });
    }

    // 2. Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Please enter your full name.' });
    }

    if (!businessName || typeof businessName !== 'string' || businessName.trim().length < 1) {
      return res.status(400).json({ error: 'Please enter your business name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // Message is optional - defaults to 'Not provided' if empty
    const cleanMessage =
      message && typeof message === 'string' && message.trim().length > 0
        ? message.trim()
        : 'Not provided';

    // 3. Check Resend API Key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      console.error(
        '[Vistaar Studio] RESEND_API_KEY is not set. Please add RESEND_API_KEY to your .env or AI Studio Secrets.'
      );
      return res.status(500).json({
        error:
          'Email service is not configured yet (RESEND_API_KEY is missing). Please configure RESEND_API_KEY.',
      });
    }

    const resend = new Resend(apiKey);
    const destinationEmail = 'adityakumarsingh1682006@gmail.com';
    const cleanBusiness = businessName.trim();

    const subject = `New Vistaar Studio Project Enquiry — ${cleanBusiness}`;

    // Clean, high-end editorial HTML email
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090a0d; color: #eceef2; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0f1219; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 14px; overflow: hidden; }
    .header { background-color: #141722; padding: 28px 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
    .logo { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; text-transform: uppercase; margin: 0 0 4px 0; }
    .subtitle { font-size: 11px; color: #94a3b8; margin: 0; letter-spacing: 1px; text-transform: uppercase; font-family: ui-monospace, Menlo, Consolas, monospace; }
    .content { padding: 32px; }
    .intro { font-size: 15px; line-height: 1.6; color: #cbd5e1; margin: 0 0 24px 0; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table td { padding: 12px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; vertical-align: top; }
    .table td.label { color: #94a3b8; width: 34%; font-weight: 500; font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .table td.value { color: #ffffff; font-weight: 500; }
    .message-title { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 8px; }
    .message-box { background-color: #090a0e; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 18px; color: #f1f5f9; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
    .footer { padding: 20px 32px; background-color: #07080b; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">VISTAAR STUDIO</h1>
      <p class="subtitle">New Project Enquiry</p>
    </div>
    <div class="content">
      <p class="intro">You have received a new prospective client project inquiry from the Vistaar Studio website:</p>
      
      <table class="table">
        <tr>
          <td class="label">Name</td>
          <td class="value">${escapeHtml(name.trim())}</td>
        </tr>
        <tr>
          <td class="label">Business Name</td>
          <td class="value">${escapeHtml(cleanBusiness)}</td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${escapeHtml(email.trim())}" style="color: #ffffff; text-decoration: underline;">${escapeHtml(email.trim())}</a></td>
        </tr>
        <tr>
          <td class="label">Phone</td>
          <td class="value">${escapeHtml(phone && phone.trim() ? phone.trim() : 'Not provided')}</td>
        </tr>
        <tr>
          <td class="label">Business Type</td>
          <td class="value">${escapeHtml(businessType && businessType.trim() ? businessType.trim() : 'General')}</td>
        </tr>
        <tr>
          <td class="label">Service Required</td>
          <td class="value">${escapeHtml(serviceNeeded && serviceNeeded.trim() ? serviceNeeded.trim() : 'New Website')}</td>
        </tr>
      </table>

      <div class="message-title">Project / Goals:</div>
      <div class="message-box">${escapeHtml(cleanMessage)}</div>
    </div>
    <div class="footer">
      Vistaar Studio Web Intake · Click 'Reply' in Gmail to reply directly to ${escapeHtml(name.trim())} (${escapeHtml(email.trim())})
    </div>
  </div>
</body>
</html>
    `;

    const { error: resendError } = await resend.emails.send({
      from: 'Vistaar Studio <onboarding@resend.dev>',
      to: [destinationEmail],
      replyTo: email.trim(),
      subject,
      html: htmlContent,
    });

    if (resendError) {
      console.error('[Resend Error]', resendError);
      return res.status(500).json({
        error: resendError.message || 'Something went wrong. Please try again.',
      });
    }

    return res.status(200).json({
      success: true,
      message: "Thanks — your project enquiry has been sent. We'll get back to you soon.",
    });
  } catch (err: any) {
    console.error('[Server Error /api/contact]', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// Vite Middleware for Dev / Static serving for Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Vistaar Studio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
