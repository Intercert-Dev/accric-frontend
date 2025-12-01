import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Parse JSON
app.use(bodyParser.json());

/* -------------------------------------------------------------
   EMAIL API (runs before Angular SSR)
--------------------------------------------------------------*/
app.post('/send-mail', async (req, res) => {
  const { name, email, number, company, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@accric.com",
        pass: "vvxsnasklhuujsfr"
      }
    });

    // IMPORTANT: Correct absolute path for image file
    const logoPath = join(process.cwd(), "src", "assets", "images", "main-logo1.png");

    const mailOptions = {
      from: `"Accric" <noreply@accric.com>`,
      to: "ashutosh@intercert.com",
      subject: "New Contact Form Submission",
      html: `
      <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; background: #ffffff; margin: 0 auto; border-radius: 10px; overflow: hidden;">
  
    <!-- Header -->
    <div style="background: #87CEFA; padding: 12px; text-align:center;">
      <img src="cid:accric_logo" height="60" style="display:block;margin:0 auto;" />
      <h2 style="color:white;margin:5px 0 0 0;font-weight:600;">New Contact Enquiry</h2>
    </div>

    <!-- Body -->
    <div style="padding: 25px; color:#333; font-size:15px;">

      <!-- Submitted On -->
      <table width="100%" style="margin-bottom:15px;">
        <tr>
          <td width="40" style="font-size:20px;">📅</td>
          <td width="140"><b>Submitted On:</b></td>
          <td>${new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</td>
        </tr>
      </table>

      <!-- Name -->
      <table width="100%" style="margin-bottom:10px;">
        <tr>
          <td width="40" style="font-size:20px;">🧑</td>
          <td width="140"><b>Name:</b></td>
          <td>${name}</td>
        </tr>
      </table>

      <!-- Email -->
      <table width="100%" style="margin-bottom:10px;">
        <tr>
          <td width="40" style="font-size:20px;">📧</td>
          <td width="140"><b>Email:</b></td>
          <td>${email}</td>
        </tr>
      </table>

      <!-- Phone -->
      <table width="100%" style="margin-bottom:10px;">
        <tr>
          <td width="40" style="font-size:20px;">📞</td>
          <td width="140"><b>Phone:</b></td>
          <td>${number}</td>
        </tr>
      </table>

      <!-- Company -->
      <table width="100%" style="margin-bottom:10px;">
        <tr>
          <td width="40" style="font-size:20px;">🏢</td>
          <td width="140"><b>Company:</b></td>
          <td>${company}</td>
        </tr>
      </table>

      <!-- Subject -->
      <table width="100%" style="margin-bottom:10px;">
        <tr>
          <td width="40" style="font-size:20px;">📝</td>
          <td width="140"><b>Subject:</b></td>
          <td>${subject}</td>
        </tr>
      </table>

      <!-- Message -->
      <table width="100%" style="margin-bottom:10px;">
        <tr>
          <td width="40" style="font-size:20px;">💬</td>
          <td width="140"><b>Message:</b></td>
          <td>${message}</td>
        </tr>
      </table>

      <!-- Reply Button -->
      <div style="margin-top:25px; text-align:center;">
        <a href="mailto:${email}"
          style="display:inline-block; background:#0b2c6a; color:#fff; padding:12px 20px; text-decoration:none; border-radius:6px; font-size:14px;">
          📩 Reply to ${name}
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#87CEFA; padding:15px; text-align:center; font-size:13px; color:#333;">
      This message was generated from your website contact form.
    </div>

  </div>
</div>

      `,

      // 👇 THIS PART EMBEDS YOUR IMAGE AND MAKES IT VISIBLE
      attachments: [
        {
          filename: "main-logo1.png",
          path: logoPath,
          cid: "accric_logo"
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});


/* -------------------------------------------------------------
   Angular server-side rendering
--------------------------------------------------------------*/
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/* -------------------------------------------------------------
   Start server
--------------------------------------------------------------*/
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
