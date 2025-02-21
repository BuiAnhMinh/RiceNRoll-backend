const express = require("express");
const Setting = require("../models/Setting");
const router = express.Router();

// Get Dark Mode setting
router.get("/dark-mode", async (req, res) => {
  const setting = await Setting.findOne({ key: "darkMode" });
  res.json({ enabled: setting ? setting.value : false });
});

// Update Dark Mode setting
router.post("/dark-mode", async (req, res) => {
  await Setting.updateOne({ key: "darkMode" }, { value: req.body.enabled }, { upsert: true });
  res.json({ success: true });
});

module.exports = router;
