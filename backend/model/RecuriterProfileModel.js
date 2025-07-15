const mongoose = require("mongoose");

const RecruiterProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: [true, "User ID is required"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    aboutMe: {
      type: String,
      maxlength: 1000,
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
    },
    organization: {
      type: String,
      required: [true, "Organization is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    hobbies: {
      type: String,
      trim: true,
    },
    linkedin: {
        type: String,
        trim: true,
      },
      facebook: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      codepen: {
        type: String,
        trim: true,
      },
      figma: {
        type: String,
        trim: true,
      },
      portfolioUrl: {
        type: String,
        trim: true,
      },
      medium: {
        type: String,
        trim: true,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RecruiterProfile", RecruiterProfileSchema);
