// backend/server.js
// backend/server.js
const express = require("express");
const cors = require("cors");
const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const app = express();

console.log("✅ Loaded server.js at", new Date().toISOString());

// ✅ CORS: allow all origins & handle preflight for /api/*
app.use(cors()); // adds CORS headers for all responses
app.options("/api/*", cors()); // handle OPTIONS preflight for any /api route

// ✅ Parse JSON body
app.use(express.json());



// (keep the rest of your routes as they are)

// ... your contact route, health route, root route, and app.listen exactly as before ...


// Log every request so we can see it in Render logs
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.path} Origin: ${req.headers.origin}`
  );
  next();
});

// ✅ Health check
app.get("/api/health", (_, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ✅ Simple root check
app.get("/", (_, res) => {
  res.json({ message: "✅ WallCrafter backend is working!" });
});

// ✅ Contact form route
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    // ... all your adminHtml, userHtml, and sendTransacEmail calls ...

    console.log("✅ Admin + User confirmation emails sent successfully!");
    res.json({ success: true, message: "Emails sent successfully!" });
  } catch (error) {
    console.error("❌ Email failed:", error);
    res
      .status(500)
      .json({ error: "Failed to send message", details: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




