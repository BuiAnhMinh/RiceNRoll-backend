const express = require("express");
const MenuItem = require("../models/MenuItem");
const router = express.Router();

// Get all menu items
router.get("/", async (req, res) => {
  const menuItems = await MenuItem.find();
  res.json(menuItems);
});

// Add a new menu item
router.post("/", async (req, res) => {
  const menuItem = new MenuItem(req.body);
  await menuItem.save();
  res.json({ success: true, menuItem });
});

module.exports = router;
