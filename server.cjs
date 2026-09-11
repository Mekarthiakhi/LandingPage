/**
 * Production server for Jayabheri The Pinnacle Landing Page
 * Serves static dist/ files and provides the /api/send-email endpoint via Nodemailer
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Load .env if present
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length > 0) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    }
  });
}

const PORT = process.env.PORT || 5180;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const user = process.env.SMTP_USER || 'akhilesh.medicover@gmail.com';
const pass = (process.env.SMTP_PASS || 'quxj cjzh lffw umym').replace(/\s+/g, '');
const recipient = process.env.NOTIFICATION_EMAIL || user;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
});

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle Email API
  if (req.url === '/api/send-email' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const { name, email, phone, interest, notes } = data;

        const mailHtml = `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #141412; color: #f2ede4; padding: 40px 30px; border-radius: 8px; border: 1px solid #9a7b4f;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid rgba(154,123,79,0.3); padding-bottom: 20px;">
              <h1 style="color: #c9a96e; letter-spacing: 4px; font-size: 26px; margin: 0;">JAYABHERI</h1>
              <p style="letter-spacing: 3px; font-size: 11px; color: #9a7b4f; margin: 5px 0 0 0; text-transform: uppercase;">The Pinnacle · Kokapet, Hyderabad</p>
            </div>
            <h2 style="color: #f2ede4; font-size: 20px; font-weight: normal; margin-bottom: 20px;">New Private Residence Consultation Request</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-family: sans-serif; font-size: 14px;">
              <tr style="border-bottom: 1px solid rgba(242,237,228,0.1);">
                <td style="padding: 10px 0; color: #c9a96e; width: 35%;">Client Name:</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">${name || 'N/A'}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(242,237,228,0.1);">
                <td style="padding: 10px 0; color: #c9a96e;">Email Address:</td>
                <td style="padding: 10px 0; color: #ffffff;"><a href="mailto:${email}" style="color: #c9a96e; text-decoration: none;">${email || 'N/A'}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(242,237,228,0.1);">
                <td style="padding: 10px 0; color: #c9a96e;">Phone Number:</td>
                <td style="padding: 10px 0; color: #ffffff;"><a href="tel:${phone}" style="color: #c9a96e; text-decoration: none;">${phone || 'N/A'}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(242,237,228,0.1);">
                <td style="padding: 10px 0; color: #c9a96e;">Interested Unit:</td>
                <td style="padding: 10px 0; color: #ffffff;">${interest || 'Not Specified'}</td>
              </tr>
              ${notes ? `
              <tr style="border-bottom: 1px solid rgba(242,237,228,0.1);">
                <td style="padding: 10px 0; color: #c9a96e;">Notes / Query:</td>
                <td style="padding: 10px 0; color: #ffffff;">${notes}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 10px 0; color: #c9a96e;">Submission Date:</td>
                <td style="padding: 10px 0; color: #a0a0a0;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
              </tr>
            </table>
            <div style="text-align: center; border-top: 1px solid rgba(154,123,79,0.3); padding-top: 20px; font-size: 11px; color: #888888; font-family: sans-serif;">
              This lead was captured directly from the Jayabheri The Pinnacle landing page.
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"Jayabheri The Pinnacle Enquiries" <${user}>`,
          to: recipient,
          replyTo: email,
          subject: `New Lead: ${name || 'Private Client'} — ${interest || 'Consultation Request'}`,
          html: mailHtml
        });

        // Client receipt confirmation email
        if (email && email.includes('@')) {
          try {
            await transporter.sendMail({
              from: `"Jayabheri The Pinnacle" <${user}>`,
              to: email,
              subject: 'Thank you for your interest in Jayabheri The Pinnacle, Kokapet',
              html: `
                <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #141412; color: #f2ede4; padding: 40px 30px; border-radius: 8px; border: 1px solid #9a7b4f;">
                  <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid rgba(154,123,79,0.3); padding-bottom: 20px;">
                    <h1 style="color: #c9a96e; letter-spacing: 4px; font-size: 26px; margin: 0;">JAYABHERI</h1>
                    <p style="letter-spacing: 3px; font-size: 11px; color: #9a7b4f; margin: 5px 0 0 0; text-transform: uppercase;">The Pinnacle · Kokapet, Hyderabad</p>
                  </div>
                  <h2 style="color: #f2ede4; font-size: 22px; font-weight: normal; margin-bottom: 16px;">Dear ${name || 'Valued Guest'},</h2>
                  <p style="font-family: sans-serif; font-size: 14px; line-height: 1.7; color: #d6cfc4;">
                    Thank you for registering your interest in <b>Jayabheri The Pinnacle</b> — Kokapet's premier ultra-luxury residential towers rising 55 floors above Hyderabad.
                  </p>
                  <p style="font-family: sans-serif; font-size: 14px; line-height: 1.7; color: #d6cfc4;">
                    Our residential concierge specialist has received your consultation request for the <b>${interest || 'luxury'}</b> configuration and will be in touch shortly to assist with bespoke floor plans, pricing schedules, and private preview arrangements.
                  </p>
                  <div style="background: rgba(255,255,255,0.04); border-left: 3px solid #c9a96e; padding: 15px 20px; margin: 25px 0; font-family: sans-serif; font-size: 13px; color: #e5e0d8;">
                    <b>Direct Contact:</b><br/>
                    Phone: +91 7347234445<br/>
                    Email: ${user}<br/>
                    Location: Kokapet, Hyderabad (TG RERA: P02400006797)
                  </div>
                  <p style="font-family: sans-serif; font-size: 13px; color: #999; margin-top: 30px;">
                    Warm regards,<br/>
                    <strong style="color: #c9a96e;">The Residences Concierge Team</strong><br/>
                    Jayabheri Group
                  </p>
                </div>
              `
            });
          } catch (cErr) {
            console.warn('Customer confirmation email failed:', cErr.message);
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Enquiry delivered successfully' }));
      } catch (err) {
        console.error('SMTP Delivery error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message || 'Internal Server Error' }));
      }
    });
    return;
  }

  // Serve static files from dist/
  let filePath = path.join(DIST_DIR, req.url.split('?')[0]);
  if (req.url === '/' || !path.extname(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // SPA fallback
        fs.readFile(path.join(DIST_DIR, 'index.html'), (fallbackErr, fallbackContent) => {
          if (fallbackErr) {
            res.writeHead(404);
            res.end('404 Not Found - Run npm run build first');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(fallbackContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Jayabheri The Pinnacle Server running at http://localhost:${PORT}`);
  console.log(`Notification Recipient: ${recipient}`);
});
