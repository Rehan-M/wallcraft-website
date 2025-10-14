// server.js
const express = require("express");
const cors = require("cors");
const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const app = express();

// ✅ Allow Netlify + localhost access
app.use(
  cors({
    origin: ["http://localhost:3000", "https://wallcraft-website.netlify.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ✅ Contact form route
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Configure Brevo client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    // ✅ Admin notification email (to you)
    const adminHtml = `
      <div style="background-color:#f9f9fb; padding:40px; font-family:Arial, sans-serif; color:#333;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <div style="background:linear-gradient(90deg, #7e22ce, #db2777); padding:20px 30px;">
            <h1 style="margin:0; color:white; font-size:24px;">WallCraft</h1>
            <p style="color:white; margin:4px 0 0 0; font-size:14px;">New Contact Form Submission</p>
          </div>
          <div style="padding:30px;">
            <p style="font-size:16px;">You’ve received a new message from your website:</p>
            <table style="width:100%; border-collapse:collapse; margin-top:20px;">
              <tr><td style="font-weight:bold; padding:8px;">Name:</td><td>${name}</td></tr>
              <tr><td style="font-weight:bold; padding:8px;">Email:</td><td>${email}</td></tr>
              <tr><td style="font-weight:bold; padding:8px;">Phone:</td><td>${phone || "N/A"}</td></tr>
              <tr><td style="font-weight:bold; padding:8px;">Service:</td><td>${service || "General Inquiry"}</td></tr>
              <tr><td style="font-weight:bold; padding:8px; vertical-align:top;">Message:</td><td style="white-space:pre-wrap;">${message}</td></tr>
            </table>
          </div>
          <div style="background-color:#f3e8ff; text-align:center; padding:16px;">
            <p style="margin:0; font-size:13px; color:#6b21a8;">
              © ${new Date().getFullYear()} WallCraft • Designed with ❤️ in Canada
            </p>
          </div>
        </div>
      </div>
    `;

    // ✅ User confirmation email (auto-reply)
    const userHtml = `
      <div style="background-color:#f9f9fb; padding:40px; font-family:Arial, sans-serif; color:#333;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header with Logo -->
          <div style="background:linear-gradient(90deg, #7e22ce, #db2777); padding:24px 30px; text-align:center;">
            <img src="https://i.imgur.com/lzKybLM.png" alt="WallCraft Logo" style="height:60px; margin-bottom:10px;">
            <h1 style="color:white; margin:0; font-size:22px;">Thank You for Contacting WallCraft</h1>
          </div>

          <!-- Body -->
          <div style="padding:30px;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to <strong>WallCraft</strong>! We’ve received your message and one of our specialists will contact you soon.</p>
            
            <p style="margin-top:20px; font-style:italic;">Here’s a copy of your message:</p>
            <blockquote style="border-left:4px solid #db2777; padding-left:12px; color:#555; margin-top:10px;">
              ${message}
            </blockquote>

            <p style="margin-top:25px;">In the meantime, you can explore our gallery to see the latest panel designs and installations:</p>

            <!-- CTA Button -->
            <div style="text-align:center; margin:30px 0;">
              <a href="https://wallcraft-website.netlify.app/gallery" 
                style="background:linear-gradient(90deg, #7e22ce, #db2777); 
                       color:white; text-decoration:none; padding:12px 28px; 
                       border-radius:6px; font-weight:bold; display:inline-block;">
                Visit Our Gallery
              </a>
            </div>

            <p>We appreciate your interest and look forward to transforming your space.</p>
            <p>Warm regards,<br><strong>The WallCraft Team</strong></p>
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

    // ✅ Send admin email
    await tranEmailApi.sendTransacEmail({
      sender: { email: process.env.EMAIL_FROM, name: "WallCraft Website" },
      to: [{ email: process.env.EMAIL_TO }],
      subject: `New Contact Form Message: ${service || "General Inquiry"}`,
      htmlContent: adminHtml,
    });

    // ✅ Send confirmation to user
    await tranEmailApi.sendTransacEmail({
      sender: { email: process.env.EMAIL_FROM, name: "WallCraft" },
      to: [{ email }],
      subject: "We’ve received your message at WallCraft!",
      htmlContent: userHtml,
    });

    console.log("✅ Admin + User confirmation emails sent successfully!");
    res.json({ success: true, message: "Emails sent successfully!" });
  } catch (error) {
    console.error("❌ Email failed:", error);
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
});

// ✅ Health route
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend is working!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



