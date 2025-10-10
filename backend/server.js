// server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// ✅ CORS configuration
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://wallcraft-website.netlify.app"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));


app.use(express.json());

// ✅ Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is working!" });
});

// ✅ Contact form route
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Message: ${service}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        Message: ${message}
      `,
    });

    console.log("✅ Email sent successfully!");
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Email failed:", error);
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

