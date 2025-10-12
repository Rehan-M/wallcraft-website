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
    // Initialize Brevo client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const emailData = {
      sender: { email: "info@newage-store.com", name: "WallCraft Website" },
      to: [{ email: "info@newage-store.com", name: "WallCraft Admin" }],
      subject: `New Contact Form Message: ${service || "General Inquiry"}`,
      htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    const response = await tranEmailApi.sendTransacEmail(emailData);
    console.log("✅ Email sent successfully:", response);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Email failed:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));