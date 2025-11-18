// backend/server.js
const express = require("express");
const cors = require("cors");
const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "https://wallcrafter.com",
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ... your contact route, health route, root route, and app.listen exactly as before ...


// Log every request so we can see it in Render logs
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.path} Origin: ${req.headers.origin}`
  );
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Dummy contact endpoint
app.post("/api/contact", (req, res) => {
  console.log("Contact body:", req.body);
  return res.json({ success: true, message: "Dummy contact endpoint works" });
});

// Root route to be extra obvious
app.get("/", (req, res) => {
  res.json({ message: "✅ Minimal WallCrafter backend is running." });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`🚀 Minimal server running on port ${PORT}`)
);




