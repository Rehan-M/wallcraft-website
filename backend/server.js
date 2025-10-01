// server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// ✅ Enable CORS for Netlify + local dev
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://wallcraft-website.netlify.app",
     
    ],
    methods: ["GET", "POST", "OPTIONS"], // allow preflight
    allowedHeaders: ["Content-Type"],
    credentials: false, // no cookies
  })
);

// ✅ Explicitly handle OPTIONS (preflight) requests
app.options("*", cors());

app.use(express.json());

// Contact form endpoint
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
      to: "info@newage-store.com",
      subject: `New Contact Form Message: ${service || "General Inquiry"}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Service: ${service || "N/A"}
        Message: ${message}
      `,
    });

    console.log("✅ Email sent successfully!");
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Email failed:", err);
    res.status(500).json({ error: "Failed to send email", details: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);



