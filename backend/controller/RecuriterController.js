const Recruiter = require("../model/RecuriterModel");
const UserResume = require("../model/Resume");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Register

exports.register = async (req, res) => {
  const {
    firstname,
    lastname,
    organizationemail,
    phone,
    password,
    confirmPassword,
    policy,
  } = req.body;

  try {
    // Validations
    if (
      !firstname ||
      !lastname ||
      !organizationemail ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!policy) {
      return res.status(400).json({ message: "You must agree to the policy" });
    }

    const existing = await Recruiter.findOne({ organizationemail });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save new recruiter
    const newRecruiter = await Recruiter.create({
      firstname,
      lastname,
      organizationemail,
      phone,
      password,
      otp,
      otpExpires,
    });

 

    // Mail setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP mail
    await transporter.sendMail({
      from: `"Sharp AI Recruiter" <${process.env.EMAIL_USER}>`,
      to: organizationemail,
      subject: "🔐 Sharp AI Recruiter - Email Verification Code",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 500px; margin: auto;">
          <h2 style="color: #1e40af;">Verify Your Email</h2>
          <p>Thank you for signing up with <strong>Sharp AI Recruiter</strong>.</p>
          <p>Your 6-digit verification code is:</p>
          <div style="font-size: 28px; font-weight: bold; color: #fff; background-color: #1e3a8a; padding: 10px; border-radius: 6px; text-align: center; margin: 20px 0;">
            ${otp}
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p style="font-size: 12px; color: #888;">If you didn’t request this, please ignore this email.</p>
        </div>
      `,
    });

    return res
      .status(201)
      .json({ message: "OTP sent to email for verification" });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await Recruiter.findOne({ otp });

    if (!user || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "Email verified. You can login now." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { organizationemail, password } = req.body;

  if (!organizationemail || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  try {

    const user = await Recruiter.findOne({ organizationemail });

    if (!user) {
      console.log("No user found with this email");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User found:", user);
    if (!user.isVerified) {
      console.log("User is not verified");
      return res.status(400).json({ message: "Email not verified" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    console.log("Login successful, returning token");
    res.status(200).json({ message: "Login successful", token ,  userId: user._id.toString()});
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { organizationemail } = req.body;

  try {
    const user = await Recruiter.findOne({ organizationemail });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const BASE_URL =
      process.env.NODE_ENV1 === "development"
        ? process.env.VITE_LOCAL_URL
        : process.env.VITE_LIVE_URL;

    if (!BASE_URL) {
      throw new Error("BASE_URL is undefined. Check your .env file.");
    }

    const resetUrl = `${BASE_URL}Recuriter-Resetpassword/${resetToken}`;
    console.log("Reset URL:", resetUrl);

    // Move transporter here
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: organizationemail,
      subject: "🔐 Reset Your Password - Sharp AI Recruiter",
      html: `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
            <h2>Sharp AI Recruiter</h2>
          </div>
          <div style="padding: 30px;">
            <h3 style="color: #333;">Reset Your Password</h3>
            <p style="color: #555;">Click below to reset your password. This link is valid for <strong>15 minutes</strong>.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reset Password</a>
            </div>
            <p style="font-size: 13px; color: #999;">If you didn't request this, ignore this email.</p>
            <p style="font-size: 13px; color: #999;">Thanks,<br/>The Sharp AI Team</p>
          </div>
        </div>
      `,
    });

    res.json({
      message: "Reset link sent to email",
      token: resetToken,
      resetUrl,
    });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Reset Password

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Password fields cannot be empty" });
  }

  if (newPassword.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  try {
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await Recruiter.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    // You might want to send a confirmation email here.

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUserResumeData = async (req, res) => {
  try {
    // Get query parameters
    const { page = 1, limit = 8 } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Ensure page and limit are valid integers
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid page number" });
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
      return res.status(400).json({ success: false, message: "Invalid limit" });
    }

    // Query resumes with pagination
    const resumes = await UserResume.find({
      resumeTitle: { $ne: null, $nin: ["", " "] },
      userName: { $ne: null, $nin: ["", " "] },
      "personalDetails.firstName": { $ne: null, $nin: ["", " "] },
      "personalDetails.lastName": { $ne: null, $nin: ["", " "] },
      "personalDetails.jobTitle": { $ne: null, $nin: ["", " "] },

    })
      .skip((pageNumber - 1) * limitNumber) // Skip resumes for previous pages
      .limit(limitNumber); // Limit the number of results per page
    // Limit the number of resumes per page

 // Get the total number of resumes (for pagination) 
    const totalResumes = await UserResume.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalResumes / limitNumber);

    // Send the response with resumes and pagination data
    res.status(200).json({
      success: true,
      resumes,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
