import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // ⭐ Allow CORS for local Angular dev
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ⭐ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, number, company, subject, message } = req.body;
  const logoPath = join(process.cwd(), "src", "assets", "images", "main-logo1.png");

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

    // Hosted image
    const logoUrl = "main-logo1.png";

    const mailOptions = {
      from: `"Accric" <noreply@accric.com>`,
      to: "ashutosh@intercert.com",
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial; background:#f4f4f4; padding:20px;">
          <div style="max-width:600px;background:#fff;margin:auto;border-radius:10px;overflow:hidden;">
            <div style="background:#87CEFA;padding:12px;text-align:center;">
              <img src="cid:accric_logo" height="60" />
              <h2 style="color:#fff;margin-top:5px;">New Contact Enquiry</h2>
            </div>

            <div style="padding:25px;">
              ${createRow("📅", "Submitted On", new Date().toLocaleString())}
              ${createRow("🧑", "Name", name)}
              ${createRow("📧", "Email", email)}
              ${createRow("📞", "Phone", number)}
              ${createRow("🏢", "Company", company)}
              ${createRow("📝", "Subject", subject)}
              ${createRow("💬", "Message", message)}
            </div>
          </div>
        </div>
      `,
       attachments: [
        {
          filename: "main-logo1.png",
          path: logoPath,
          cid: "accric_logo"
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true });

  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

function createRow(icon, label, value) {
  return `
    <table width="100%" style="margin-bottom:10px;">
      <tr>
        <td width="40" style="font-size:20px;">${icon}</td>
        <td width="140"><b>${label}:</b></td>
        <td>${value}</td>
      </tr>
    </table>
  `;
}
