// server.js
const express = require("express");
const cors = require("cors");
const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const app = express();

// ✅ Allow your Netlify and local frontend
app.use(
  cors({
    origin: ["http://localhost:3000", "https://wallcraft-website.netlify.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ✅ Contact route
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Configure Brevo API
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    // 🖌 Branded WallCraft HTML Email Template
    const htmlContent = `
      <div style="background-color:#f9f9fb; padding:40px; font-family:Arial, sans-serif; color:#333;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background:linear-gradient(90deg, #7e22ce, #db2777); padding:20px 30px;">
            <h1 style="margin:0; color:white; font-size:24px;">WallCraft</h1>
            <p style="color:white; margin:4px 0 0 0; font-size:14px;">New Contact Form Submission</p>
          </div>
          
          <!-- Body -->
          <div style="padding:30px;">
            <p style="font-size:16px;">You’ve received a new message from your website contact form:</p>
            
            <table style="width:100%; border-collapse:collapse; margin-top:20px;">
              <tr>
                <td style="font-weight:bold; padding:8px; border-bottom:1px solid #eee;">Name:</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="font-weight:bold; padding:8px; border-bottom:1px solid #eee;">Email:</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="font-weight:bold; padding:8px; border-bottom:1px solid #eee;">Phone:</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">${phone || "N/A"}</td>
              </tr>
              <tr>
                <td style="font-weight:bold; padding:8px; border-bottom:1px solid #eee;">Service:</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">${service || "General Inquiry"}</td>
              </tr>
              <tr>
                <td style="font-weight:bold; padding:8px; vertical-align:top;">Message:</td>
                <td style="padding:8px; white-space:pre-wrap;">${message}</td>
              </tr>
            </table>

            <p style="margin-top:25px; font-size:14px; color:#666;">
              This message was submitted via the WallCraft Contact Form.
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color:#f3e8ff; text-align:center; padding:16px;">
            <p style="margin:0; font-size:13px; color:#6b21a8;">
              © ${new Date().getFullYear()} WallCraft • Designed with ❤️ in Canada
            </p>
          </div>
        </div>
      </div>
    `;

    // Configure the email object
    const emailContent = {
      sender: { email: process.env.EMAIL_FROM, name: "WallCraft Website" },
      to: [{ email: process.env.EMAIL_TO }],
      subject: `New Contact Form Message: ${service || "General Inquiry"}`,
      htmlContent,
    };

    await tranEmailApi.sendTransacEmail(emailContent);

    console.log("✅ Email sent successfully!");
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Email failed:", error);
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
});

// ✅ Health check route
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend is working!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

