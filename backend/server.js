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
    const adminHtml = `
      <div style="padding:20px;font-family:Arial;">
        <h2>New Website Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Service:</b> ${service || "General Inquiry"}</p>
        <p><b>Message:</b><br>${message}</p>
      </div>
    `;

    // ---------------------------
    // USER CONFIRMATION EMAIL
    // ---------------------------
    const userHtml = `
      <div style="padding:20px;font-family:Arial;">
        <h2>Thank You for Contacting WallCrafter</h2>
        <p>Hi <b>${name}</b>,</p>
        <p>We received your message and will reply shortly.</p>
        <p><b>Your Message:</b><br>${message}</p>
      </div>
    `;

    // Send admin email
    await tranEmailApi.sendTransacEmail({
      sender: { email: process.env.EMAIL_FROM, name: "WallCrafter Website" },
      to: [{ email: process.env.EMAIL_TO }],
      subject: `New Contact Form Message: ${service || "General Inquiry"}`,
      htmlContent: adminHtml,
    });

    // Send confirmation to customer
    await tranEmailApi.sendTransacEmail({
      sender: { email: process.env.EMAIL_FROM, name: "WallCrafter" },
      to: [{ email }],
      subject: "We’ve received your message at WallCrafter!",
      htmlContent: userHtml,
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
