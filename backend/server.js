// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔓 Allow all origins (for debugging)
app.use(cors());
app.options("*", cors());

app.use(express.json());

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




