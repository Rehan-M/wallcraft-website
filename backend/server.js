// server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();   // load .env variables

const app = express();

// Allow React frontend to talk to backend
app.use(cors({
  origin:  ["http://localhost:3000", "https://your-frontend-site.netlify.app"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

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

    transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "info@newage-store.com",
      subject: `New Contact Form Message: ${service}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        Message: ${message}
      `,
    }, (err, info) => {
      if (err) {
        console.error("❌ Email failed:", err);
        return res.status(500).json({ error: "Failed to send email", details: err });
      } else {
        console.log("✅ Email sent:", info.response);
        return res.json({ success: true });
      }
    });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

