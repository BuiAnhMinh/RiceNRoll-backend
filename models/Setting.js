const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model("Setting", SettingSchema);
