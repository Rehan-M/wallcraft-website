// server.js
// server.js
const express = require("express");
const cors = require("cors");
const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const app = express();

// ✅ Allow frontend URLs
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
    // Configure Brevo API
    SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
      process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const emailContent = {
      sender: { email: process.env.EMAIL_FROM || process.env.EMAIL_USER, name: "WallCraft Website" },
      to: [{ email: process.env.EMAIL_TO || process.env.EMAIL_USER }],
      subject: `New Contact Form Message: ${service || "General Inquiry"}`,
      htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
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
