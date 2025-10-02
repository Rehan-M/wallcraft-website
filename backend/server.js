// server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// ✅ Apply CORS globally (allow Netlify + local dev)
app.use(cors({
  origin: ["http://localhost:3000", "https://wallcraft-website.netlify.app"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Handle preflight explicitly
app.options("*", cors());

app.use(express.json());

// 📩 Contact API
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
      to: "info@newage-store.com", // change to your actual inbox
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
    return res.json({ success: true });

  } catch (err) {
    console.error("❌ Email failed:", err);
    return res.status(500).json({ error: "Failed to send email", details: err.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

