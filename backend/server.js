// server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const app = express();

// ✅ Allow your frontend to communicate
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://wallcraft-website.netlify.app",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend is working!" });
});

// ✅ Contact form route
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Initialize Brevo API
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const emailData = {
      sender: { email: process.env.EMAIL_FROM, name: "WallCraft Website" },
      to: [{ email: process.env.EMAIL_TO }],
      subject: `New Contact Form Message: ${service || "General Inquiry"}`,
      htmlContent: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Service:</strong> ${service || "N/A"}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    await apiInstance.sendTransacEmail(emailData);

    console.log("✅ Email sent via Brevo");
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email failed:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

