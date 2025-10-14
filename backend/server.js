// server.js
const express = require("express");
const cors = require("cors");
const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const app = express();

// ✅ Allow your frontend to connect
app.use(
  cors({
    origin: ["http://localhost:3000", "https://wallcraft-website.netlify.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ✅ Contact form endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Initialize Brevo
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    // ✅ 1️⃣ HTML template for the admin notification (you)
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

    // ✅ 2️⃣ HTML template for user auto-reply
    const userHtml = `
      <div style="background-color:#f9f9fb; padding:40px; font-family:Arial, sans-serif; color:#333;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <div style="background:linear-gradient(90deg, #7e22ce, #db2777); padding:20px 30px;">
            <h1 style="margin:0; color:white; font-size:24px;">WallCraft</h1>
            <p style="color:white; margin:4px 0 0 0; font-size:14px;">Thank you for contacting us!</p>
          </div>
          <div style="padding:30px;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to <strong>WallCraft</strong>. We’ve received your message and one of our team members will contact you soon.</p>
            <p style="margin-top:20px; font-style:italic;">Here’s a copy of what you sent us:</p>
            <blockquote style="border-left:4px solid #db2777; padding-left:12px; color:#555; margin-top:10px;">
              ${message}
            </blockquote>
            <p style="margin-top:25px;">We appreciate your interest and look forward to working with you!</p>
            <p>Warm regards,<br><strong>The WallCraft Team</strong></p>
          </div>
          <div style="background-color:#f3e8ff; text-align:center; padding:16px;">
            <p style="margin:0; font-size:13px; color:#6b21a8;">
              © ${new Date().getFullYear()} WallCraft • Designed with ❤️ in Canada
            </p>
          </div>
        </div>
      </div>
    `;

    // ✅ Send email to admin
    await tranEmailApi.sendTransacEmail({
      sender: { email: process.env.EMAIL_FROM, name: "WallCraft Website" },
      to: [{ email: process.env.EMAIL_TO }],
      subject: `New Contact Form Message: ${service || "General Inquiry"}`,
      htmlContent: adminHtml,
    });

    // ✅ Send auto-reply to user
    await tranEmailApi.sendTransacEmail({
      sender: { email: process.env.EMAIL_FROM, name: "WallCraft" },
      to: [{ email }],
      subject: "We’ve received your message at WallCraft!",
      htmlContent: userHtml,
    });

    console.log("✅ Both emails sent successfully!");
    res.json({ success: true, message: "Message and confirmation email sent!" });
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


