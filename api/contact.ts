import { Resend } from 'resend';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const {
      name,
      businessName,
      email,
      phone,
      businessType,
      serviceNeeded,
      message,
      honeypot,
    } = req.body ?? {};

    // Silent success for bots that fill the hidden honeypot field.
    if (honeypot && String(honeypot).trim() !== '') {
      return res.status(200).json({
        success: true,
        message: "Thanks — your project enquiry has been sent. We'll get back to you soon.",
      });
    }

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

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.error('[Vistaar] RESEND_API_KEY is missing.');
      return res.status(500).json({ error: 'Email service is not configured yet. Please try again later.' });
    }

    const destinationEmail = process.env.CONTACT_TO_EMAIL?.trim() || 'adityakumarsingh1682006@gmail.com';
    const cleanName = name.trim();
    const cleanBusiness = businessName.trim();
    const cleanEmail = email.trim();
    const cleanMessage =
      typeof message === 'string' && message.trim() ? message.trim() : 'Not provided';
    const cleanPhone = typeof phone === 'string' && phone.trim() ? phone.trim() : 'Not provided';
    const cleanBusinessType =
      typeof businessType === 'string' && businessType.trim() ? businessType.trim() : 'Not provided';
    const cleanService =
      typeof serviceNeeded === 'string' && serviceNeeded.trim() ? serviceNeeded.trim() : 'Not provided';

    const subject = `New Vistaar Studio Project Enquiry — ${cleanBusiness}`;

    const html = `
      <!doctype html>
      <html>
        <body style="margin:0;padding:24px;background:#090a0d;color:#eceef2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif">
          <div style="max-width:600px;margin:auto;background:#0f1219;border:1px solid rgba(255,255,255,.12);border-radius:14px;overflow:hidden">
            <div style="padding:28px 32px;background:#141722;border-bottom:1px solid rgba(255,255,255,.08)">
              <div style="font-size:22px;font-weight:800;color:#fff;letter-spacing:-.5px">VISTAAR STUDIO</div>
              <div style="margin-top:5px;font-size:11px;color:#94a3b8;letter-spacing:1px;text-transform:uppercase">New Project Enquiry</div>
            </div>
            <div style="padding:32px">
              <p style="margin:0 0 24px;color:#cbd5e1;font-size:15px;line-height:1.6">A new project enquiry was submitted through the Vistaar Studio website.</p>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:11px 0;color:#94a3b8;font-size:11px;text-transform:uppercase;width:34%">Name</td><td style="padding:11px 0;color:#fff">${escapeHtml(cleanName)}</td></tr>
                <tr><td style="padding:11px 0;color:#94a3b8;font-size:11px;text-transform:uppercase">Business</td><td style="padding:11px 0;color:#fff">${escapeHtml(cleanBusiness)}</td></tr>
                <tr><td style="padding:11px 0;color:#94a3b8;font-size:11px;text-transform:uppercase">Email</td><td style="padding:11px 0"><a href="mailto:${escapeHtml(cleanEmail)}" style="color:#fff">${escapeHtml(cleanEmail)}</a></td></tr>
                <tr><td style="padding:11px 0;color:#94a3b8;font-size:11px;text-transform:uppercase">Phone</td><td style="padding:11px 0;color:#fff">${escapeHtml(cleanPhone)}</td></tr>
                <tr><td style="padding:11px 0;color:#94a3b8;font-size:11px;text-transform:uppercase">Business Type</td><td style="padding:11px 0;color:#fff">${escapeHtml(cleanBusinessType)}</td></tr>
                <tr><td style="padding:11px 0;color:#94a3b8;font-size:11px;text-transform:uppercase">Service</td><td style="padding:11px 0;color:#fff">${escapeHtml(cleanService)}</td></tr>
              </table>
              <div style="margin-top:24px;color:#94a3b8;font-size:11px;text-transform:uppercase">Project / Goals</div>
              <div style="margin-top:8px;padding:18px;background:#090a0e;border:1px solid rgba(255,255,255,.08);border-radius:8px;color:#f1f5f9;line-height:1.6;white-space:pre-wrap">${escapeHtml(cleanMessage)}</div>
            </div>
            <div style="padding:20px 32px;background:#07080b;border-top:1px solid rgba(255,255,255,.06);font-size:12px;color:#64748b;text-align:center">Reply to this email to respond directly to ${escapeHtml(cleanName)}.</div>
          </div>
        </body>
      </html>
    `;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Vistaar Studio <onboarding@resend.dev>',
      to: [destinationEmail],
      replyTo: cleanEmail,
      subject,
      html,
    });

    if (error) {
      console.error('[Vistaar Resend Error]', error);
      return res.status(500).json({ error: 'Email delivery failed. Please try again.' });
    }

    return res.status(200).json({
      success: true,
      message: "Thanks — your project enquiry has been sent. We'll get back to you soon.",
    });
  } catch (error) {
    console.error('[Vistaar Contact Error]', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
