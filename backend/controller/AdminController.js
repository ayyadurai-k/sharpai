const Admin = require("../model/AdminModel");
const UserResume = require("../model/Resume");
const DailyAnalytics = require("../model/UserActivities");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cron = require("node-cron");

// Admin Registration
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already registered" });
    }

    // Create new admin
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.UserDashbardData = async (req, res) => {
  try {
    const validUsersFilter = {
      "personalDetails.firstName": { $exists: true, $ne: "" },
      "personalDetails.lastName": { $exists: true, $ne: "" },
      "personalDetails.jobTitle": { $exists: true, $ne: "" },
      "personalDetails.email": { $exists: true, $ne: "" },
    };

    const totalResumes = await UserResume.countDocuments(validUsersFilter);
    const totalStudents = await UserResume.distinct(
      "personalDetails.email",
      validUsersFilter
    ).then((emails) => emails.length);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const currentStudents = await UserResume.distinct("personalDetails.email", {
      ...validUsersFilter,
      createdAt: { $gte: thirtyDaysAgo },
    }).then((emails) => emails.length);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const activeToday = await UserResume.distinct("personalDetails.email", {
      ...validUsersFilter,
      createdAt: { $gte: todayStart, $lte: todayEnd },
    }).then((emails) => emails.length);

    res.json({ totalResumes, totalStudents, currentStudents, activeToday });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};

exports.UserlistData = async (req, res) => {
  try {
    console.log("Fetching user resumes...");

    // Fetching resumes with specific fields
    getUserResumeData
    console.log("Fetched resumes:", resumes);

    // Get date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    console.log("Thirty days ago:", thirtyDaysAgo);

    // Formatting resumes
    const formattedResumes = resumes
      .map((resume) => {
        const jobTitle = resume.personalDetails?.jobTitle?.trim() || "";

        const isActive =
          resume.updatedAt && new Date(resume.updatedAt) >= thirtyDaysAgo;

        return jobTitle
          ? {
              userName: resume.userName,
              userEmail: resume.userEmail,
              jobTitle,
              status: isActive ? "Active" : "Inactive",
            }
          : null;
      })
      .filter((user) => user !== null);

    res.json(formattedResumes);
  } catch (error) {
    console.error("Error fetching user resumes:", error);
    res.status(500).json({ error: "Failed to fetch user resumes" });
  }
};



exports.useralldetaills = async (req, res) => {
  try {
    console.log("Fetching user resumes...");

    // Fetch all user resume details
    const resumes = await UserResume.find();

    // Filter out entries where required fields are missing or empty
    const filteredResumes = resumes.filter(resume => {
      return (
        resume.userName && resume.userName.trim() !== '' &&
        resume.userEmail && resume.userEmail.trim() !== '' &&
        resume.personalDetails &&
        resume.personalDetails.jobTitle &&
        resume.personalDetails.jobTitle.trim() !== ''
      );
    });

    console.log("Filtered resumes:", filteredResumes);

    // Send the filtered resumes as response
    res.status(200).json(filteredResumes);
  } catch (error) {
    console.error("Error fetching user resumes:", error);
    res.status(500).json({ error: "Failed to fetch user resumes" });
  }
};







exports.UsersearchQuery = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const results = await UserResume.find({
      $or: [
        { resumeTitle: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } },
        { userEmail: { $regex: query, $options: "i" } },
        { "personalDetails.jobTitle": { $regex: query, $options: "i" } },
      ],
    });

    console.log(results);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDailyActiveUsers = async (req, res = null) => {
  try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0); 

      const activeUsers = await UserResume.distinct("userEmail", {
          "userEmail": { $exists: true, $ne: "" },
          lastUpdatedAt: { $gte: todayStart },
      }).then((emails) => emails.length);

      // Upsert into DailyAnalytics
      await DailyAnalytics.updateOne(
          { date: todayStart },
          { $set: { date: todayStart, activeUsers, lastUpdated: new Date() } }, 
          { upsert: true }
      );

      console.log(`✅ Active users updated: ${activeUsers} at ${new Date().toLocaleTimeString()}`);

  
      if (res) {
          return res.status(200).json({
              success: true,
              message: "Daily active users updated successfully",
              activeUsers,
              timestamp: new Date(),
          });
      }
  } catch (error) {
      console.error("❌ Error updating daily active users:", error);

      if (res) {
          return res.status(500).json({
              success: false,
              message: "Failed to update daily active users",
              error: error.message,
          });
      }
  }
};

exports.calculateAndStoreDailyActiveUsers = updateDailyActiveUsers;


setInterval(() => updateDailyActiveUsers(), 5 * 60 * 1000); 

cron.schedule("*/5 * * * *", () => {
  console.log("⏳ Running scheduled update for active users...");
  updateDailyActiveUsers();
});







