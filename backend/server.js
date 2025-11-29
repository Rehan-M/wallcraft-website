// backend/server.js
const express = require("express");
const cors = require("cors");
const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const app = express();

// ---------------------------------------------------------
// CORS (allowed domains only)
// ---------------------------------------------------------
app.use(
  cors({
    origin: [
      "https://www.wallcrafter.com",
      "https://wallcrafter.com",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Parse JSON
app.use(express.json());

// ---------------------------------------------------------
// Optional basic logger (kept minimal for production)
// ---------------------------------------------------------
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Preflight for /api/contact
app.options("/api/contact", (req, res) => {
  res.sendStatus(204);
});

// Health check
app.get("/api/health", (_, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Root check
app.get("/", (_, res) => {
  res.json({ message: "WallCrafter backend running" });
});

// ---------------------------------------------------------
// CONTACT FORM ROUTE
// ---------------------------------------------------------
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    if (!process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
      console.error("EMAIL_FROM or EMAIL_TO is missing");
      return res.status(500).json({ error: "Email configuration error" });
    }

    // ---------------------------
    // ADMIN EMAIL (to you)
    // ---------------------------
    // inside your try { ... } in the contact route

// Full rich admin HTML (branded)
const adminHtml = `
<div style="background-color:#f9f9fb; padding:40px; font-family:Arial, sans-serif; color:#333;">
  <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(90deg, #7e22ce, #db2777); padding:20px 30px;">
      <h1 style="margin:0; color:white; font-size:24px;">WallCrafter</h1>
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
        © ${new Date().getFullYear()} WallCrafter • Designed with ❤️ in Canada
      </p>
    </div>
  </div>
</div>
`;

// Full rich user confirmation HTML (branded)
const userHtml = `
<div style="background-color:#f9f9fb; padding:40px; font-family:Arial, sans-serif; color:#333;">
  <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(90deg, #7e22ce, #db2777); padding:24px 30px; text-align:center;">
      <img src="https://i.imgur.com/fsAiunB.png" alt="WallCrafter Logo" style="height:60px; margin-bottom:10px;">
      <h1 style="color:white; margin:0; font-size:22px;">Thank You for Contacting WallCrafter</h1>
    </div>
    <div style="padding:30px;">
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for reaching out to <strong>WallCrafter</strong>! We’ve received your message and one of our specialists will contact you soon.</p>
      <p style="margin-top:20px; font-style:italic;">Here’s a copy of your message:</p>
      <blockquote style="border-left:4px solid #db2777; padding-left:12px; color:#555; margin-top:10px;">
        ${message}
      </blockquote>
      <p style="margin-top:25px;">In the meantime, you can explore our gallery to see the latest panel designs and installations:</p>
      <div style="text-align:center; margin:30px 0;">
        <a href="https://wallcrafter.com/gallery"
          style="background:linear-gradient(90deg, #7e22ce, #db2777);
                 color:white; text-decoration:none; padding:12px 28px;
                 border-radius:6px; font-weight:bold; display:inline-block;">
          Visit Our Gallery
        </a>
      </div>
      <p>We appreciate your interest and look forward to transforming your space.</p>
      <p>Warm regards,<br><strong>The WallCrafter Team</strong></p>
    </div>
    <div style="background-color:#f3e8ff; text-align:center; padding:16px;">
      <p style="margin:0; font-size:13px; color:#6b21a8;">
        © ${new Date().getFullYear()} WallCrafter • Designed with ❤️ in Canada
      </p>
    </div>
  </div>
</div>
`;

// DEBUG LOG (optional)
console.log("📧 Sending rich HTML emails to:", { admin: process.env.EMAIL_TO, user: email });

// SEND ADMIN EMAIL (rich HTML)
await tranEmailApi.sendTransacEmail({
sender: { email: process.env.EMAIL_FROM, name: "WallCrafter Website" },
to: [{ email: process.env.EMAIL_TO }],
subject: `New Contact Form Message: ${service || "General Inquiry"}`,
htmlContent: adminHtml,     // <- IMPORTANT: htmlContent contains the rich HTML
});

// SEND CONFIRMATION TO USER (rich HTML)
await tranEmailApi.sendTransacEmail({
sender: { email: process.env.EMAIL_FROM, name: "WallCrafter" },
to: [{ email }],
subject: "We’ve received your message at WallCrafter!",
htmlContent: userHtml,      // <- IMPORTANT: htmlContent contains the rich HTML
});


    res.json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    const brevoText = error?.response?.text;
    console.error("Email send failed:", brevoText || error.message);

    res.status(500).json({
      error: "Failed to send message",
      details: brevoText || error.message || "Unknown error",
    });
  }
});

// ---------------------------------------------------------
// START SERVER
// ---------------------------------------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
