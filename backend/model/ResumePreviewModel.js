const mongoose = require("mongoose");

const recruiterProfileSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "RecruiterProfile",
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "SHARP_RESUMEAI_RESUMES",  
  },
  username: String,
  role: String,
  viewedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recruiterpreviewresume", recruiterProfileSchema);
