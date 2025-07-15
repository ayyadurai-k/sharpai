// controllers/recruiterProfileController.js
const RecruiterProfile = require("../model/RecuriterProfileModel");
const Resumepreview = require("../model/ResumePreviewModel");



exports.BasicDetailsSave = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      gender,
      designation,
      experience,
      organization,
    } = req.body;

    const userId = req.user?.id || req.body.userId;

    // Basic validation
    if (!userId || !firstName || !lastName || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if profile already exists
    const existingProfile = await RecruiterProfile.findOne({ userId });

    let profile;

    if (existingProfile) {
      profile = await RecruiterProfile.findOneAndUpdate(
        { userId },
        {
          firstName,
          lastName,
          email,
          mobile,
          gender,
          designation,
          experience,
          organization,
        },
        { new: true }
      );
    } else {
      // Create new profile
      profile = await RecruiterProfile.create({
        userId,
        firstName,
        lastName,
        email,
        mobile,
        gender,
        designation,
        experience,
        organization,
      });
    }

    return res.status(200).json({
      success: true,
      message: existingProfile ? "Profile updated successfully" : "Profile created successfully",
      profile,
    });
  } catch (error) {
    console.error("Error saving recruiter basic details:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving profile",
    });
  }
};


exports.PersonalDetailsSave = async (req, res) => {
  const { userId, dateOfBirth, address, pincode, location, hobbies } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "userId is required." });
  }

  try {
    const updatedFields = {};

    if (dateOfBirth) updatedFields.dateOfBirth = dateOfBirth;
    if (address) updatedFields.address = address;
    if (pincode) updatedFields.pincode = pincode;
    if (location) updatedFields.location = location;
    if (hobbies) updatedFields.hobbies = hobbies;

    const profile = await RecruiterProfile.findOneAndUpdate(
      { userId },
      { $set: updatedFields },
      { new: true }
    );

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found." });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      profile,
    });
  } catch (error) {
    console.error("Error updating recruiter profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.AboutMeDetailsSave = async (req, res) => {
  const { userId, aboutMe } = req.body;

  if (!userId || !aboutMe) {
    return res.status(400).json({
      success: false,
      message: "userId and aboutMe are required.",
    });
  }

  if (aboutMe.length > 1000) {
    return res.status(400).json({
      success: false,
      message: "About Me must be 1000 characters or fewer.",
    });
  }

  try {
    const updatedProfile = await RecruiterProfile.findOneAndUpdate(
      { userId },
      { $set: { aboutMe } },
      { new: true }
    );

    if (!updatedProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found." });
    }

    res.status(200).json({
      success: true,
      message: "About Me updated successfully.",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating About Me:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateSocialLinksSave = async (req, res) => {
  const {
    userId,
    linkedin,
    facebook,
    github,
    twitter,
    codepen,
    figma,
    portfolioUrl,
    medium,
  } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "userId is required." });
  }

  try {
    const links = { linkedin };
    if (facebook) links.facebook = facebook;
    if (github) links.github = github;
    if (twitter) links.twitter = twitter;
    if (codepen) links.codepen = codepen;
    if (figma) links.figma = figma;
    if (portfolioUrl) links.portfolioUrl = portfolioUrl;
    if (medium) links.medium = medium;

    const profile = await RecruiterProfile.findOneAndUpdate(
      { userId },
      { $set: links },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Social links updated", profile });
  } catch (err) {
    console.error("Error updating social links:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getRecruiterProfile = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const profile = await RecruiterProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addResumePreview = async (req, res) => {
  try {
    const { recruiterId, resumeId, username, role } = req.body;

    const preview = new Resumepreview({
      recruiterId: recruiterId || null,
      resumeId,
      username,
      role,
      viewedAt: new Date(),
    });

    await preview.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Resume preview saved successfully",
        preview,
      });
  } catch (error) {
    console.error("Error saving resume preview:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getResumePreviewStats = async (req, res) => {
  try {
    const totalPreviews = await Resumepreview.countDocuments();
    const uniqueResumes = await Resumepreview.distinct("resumeId");
    const data = await Resumepreview.find({}, { username: 1, role: 1, viewedAt: 1 });
    res.status(200).json({
      success: true,
      totalPreviews,
      uniqueResumes: uniqueResumes.length,
      data,
    });
  } catch (error) {
    console.error("Error fetching preview stats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
