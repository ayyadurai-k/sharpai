const mongoose = require("mongoose");

const DailyAnalyticsSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  activeUsers: { type: Number, required: true }, 
});

module.exports = mongoose.model("DailyAnalytics", DailyAnalyticsSchema);
