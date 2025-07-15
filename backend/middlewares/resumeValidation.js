const { body } = require("express-validator");

//Title
const validateResumeTitle = [
  body("resumeId").isUUID().withMessage("Resume ID must be a valid UUID"),
  body("resumeTitle")
    .isLength({ min: 3, max: 100 })
    .withMessage("Resume title must be between 3 to 100 characters"),
  body("userEmail")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email format"),
  body("userName")
    .isLength({ min: 3, max: 50 })
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("User name must contain only alphabets and spaces, and be between 3 to 50 characters"),
];

//Personal Details
const validateResumePersonalDetails = [
  body("resumeId")
    .trim()
    .notEmpty()
    .withMessage("Resume ID is required")
    .isUUID()
    .withMessage("Resume ID must be a valid UUID"),

  body("firstName")
    .notEmpty()
    .withMessage("First name is required"),
  // .isLength({ min: 2, max: 50 })
  // .withMessage("First name must be between 2 and 50 characters")
  // .matches(/^[A-Za-z\s]+$/)
  // .withMessage("First name should contain only letters and spaces"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required"),
  // .isLength({ min: 2, max: 50 })
  // .withMessage("Last name must be between 2 and 50 characters")
  // .matches(/^[A-Za-z\s]+$/)
  // .withMessage("Last name should contain only letters and spaces"),

  body("jobTitle")
    .trim()
    .notEmpty()
    .withMessage("Job title is required"),
  // .isLength({ min: 3, max: 50 })
  // .withMessage("Job title must be between 3 and 50 characters"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required"),
  // .isLength({ min: 10, max: 100 })
  // .withMessage("Address must be between 10 and 100 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
    .withMessage("Phone number must be valid (e.g., (123)-456-7890 or 123-456-7890)"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email format"),

  // body("github")
  //   .optional()
  //   .trim()
  //   .isURL()
  //   .withMessage("Invalid GitHub URL"),

  // body("linkedin")
  //   .optional()
  //   .trim()
  //   .isURL()
  //   .withMessage("Invalid LinkedIn URL"),

  // body("portfolio")
  //   .optional()
  //   .trim()
  //   .isURL()
  //   .withMessage("Invalid Portfolio URL"),

  // body('themeColor')
  //   .trim()
  //   .notEmpty()
  //   .withMessage("Theme color is required")
  //   .matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)
  //   .withMessage("Invalid hex color format. Use #RRGGBB or #RGB")
];

//Project 
const validateResumeProject = [
  body("resumeId")
    .trim()
    .notEmpty()
    .withMessage("Resume ID is required")
    .isUUID()
    .withMessage("Resume ID must be a valid UUID"),

  body("project.*.projectId")
    .trim()
    .notEmpty()
    .withMessage("Project Id is required")
    .isInt({ min: 1 })
    .withMessage("Project ID must be a positive integer"),

  body("project.*.projectTitle")
    .trim()
    .notEmpty()
    .withMessage("Project Title is required"),

  body("project.*.companyName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Company Name is required")
    .isString()
    .withMessage("Company Name must be a valid string"),

  body("project.*.duration")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Duration is required")
    .isString()
    .withMessage("Duration must be a valid string"),

  body("project.*.techStack")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Tech Stack is required")
    .isArray()
    .withMessage("Tech Stack must be an array of strings")
    .custom((value) => value.every((item) => typeof item === "string"))
    .withMessage("Each techStack item must be a string"),

  body("project.*.description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a valid string"),
];

// Summary
const validateResumeSummary = [
  body("resumeId")
    .trim()
    .notEmpty()
    .withMessage("Resume ID is required")
    .isUUID()
    .withMessage("Resume ID must be a valid UUID"),

  body("summary")
    .trim()
    .notEmpty()
    .withMessage("Summary is required")
  // .isLength({ min: 10, max: 1000 })
  // .withMessage("Summary must be between 10 to 1000 characters")
];

// Experience
const validateResumeExperience = [
  body("resumeId")
    .trim()
    .notEmpty()
    .withMessage("Resume ID is required")
    .isUUID()
    .withMessage("Resume ID must be a valid UUID"),

  body("experience")
    .isArray({ min: 1 })
    .withMessage("Experience must be a non-empty array"),

  body("experience.*.experienceId")
    .trim()
    .notEmpty()
    .withMessage("Experience ID is required"),
  // .isNumeric()
  // .withMessage("Experience ID must be a number"),

  body("experience.*.experienceTitle")
    .trim()
    .notEmpty()
    .withMessage("Experience title is required"),

  body("experience.*.companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),

  body("experience.*.city")
    .trim()
    .notEmpty()
    .withMessage("Experience city is required"),
  // .matches(/^[A-Za-z\s]+$/)
  // .withMessage("Experience city must contain only letters"),

  body("experience.*.state")
    .trim()
    .notEmpty()
    .withMessage("Experience state is required"),
  // .isAlpha()
  // .isLength({ min: 2, max: 2 })
  // .withMessage("Experience state must be a valid two-letter code (e.g., NY, CA)"),

  body("experience.*.startDate")
    .trim()
    .notEmpty()
    .withMessage("Experience start date is required"),
  // .optional()
  // .matches(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/)
  // .withMessage("Experience start date must be in format 'MMM YYYY' (e.g., Jan 2021)"),

  body("experience.*.endDate")
    .trim()
    .notEmpty()
    .withMessage("Experience end date is required"),
  // .optional()
  // .matches(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/)
  // .withMessage("Experience end date must be in format 'MMM YYYY' (e.g., Jan 2021) or empty if currently working"),

  body("experience.*.currentlyWorking")
    .isBoolean()
    .withMessage("Experience currently working must be a boolean value (true/false)"),

  body("experience.*.description")
    .trim()
    .notEmpty()
    .withMessage("Experience description is required"),
  // .isLength({ min: 10, max: 1000 })
  // .withMessage("Experience description must be between 10 to 1000 characters"),
];

//Education
const validateResumeEducation = [
  body("resumeId")
    .trim()
    .notEmpty()
    .withMessage("Resume ID is required")
    .isUUID()
    .withMessage("Resume ID must be a valid UUID"),

  body("education")
    .isArray({ min: 1 })
    .withMessage("Education must be a non-empty array"),

  body("education.*.educationId")
    .isNumeric()
    .withMessage("Education ID must be a number"),

  body("education.*.universityName")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Education university name must be between 3 to 100 characters"),

  body("education.*.degree")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Education degree must be between 2 to 50 characters"),

  body("education.*.major")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Education major must be between 2 to 100 characters"),

  body("education.*.startDate")
    .trim()
    .notEmpty()
    .withMessage("Education start date is required"),
  // .matches(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/)
  // .withMessage("Education start date must be in format 'MMM YYYY' (e.g., Aug 2018)"),

  body("education.*.endDate")
    .trim()
    .notEmpty()
    .withMessage("Education end date is required"),
  // .matches(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/)
  // .withMessage("Education end date must be in format 'MMM YYYY' (e.g., Dec 2019)"),

  // body("education.*.description")
  //   .trim()
  //   .isLength({ min: 10, max: 1000 })
  //   .withMessage("Education description must be between 10 to 1000 characters"),
];

//Course
const validateResumeCourse = [
  body("resumeId")
    .trim()
    .notEmpty()
    .withMessage("Resume ID is required")
    .isUUID()
    .withMessage("Resume ID must be a valid UUID"),

  body("course.*.courseId")
    .trim()
    .notEmpty()
    .withMessage("Course Id is required"),
  // .isInt({ min: 1 })
  // .withMessage("Course ID must be a positive integer"),

  body("course.*.courseName")
    .trim()
    .notEmpty()
    .withMessage("Course Name is required"),

  body("course.*.institute")
    .trim()
    .notEmpty()
    .withMessage("Institute is required"),

  body("course.*.location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  body("course.*.completedDate")
    .trim()
    .notEmpty()
    .withMessage("Completed date is required"),
  // .optional()
  // .matches(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/)
  // .withMessage("Completed date must be in format 'MMM YYYY' (e.g., Jan 2021) or empty if currently working"),

  body("course.*.description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("course.*.courseTags")
    // .optional()
    .trim()
    .notEmpty()
    .withMessage("Course tags is required")
  // .isArray()
  // .withMessage("Course Tags must be an array of strings")
  // .custom((value) => value.every((tag) => typeof tag === "string"))
  // .withMessage("Each courseTag must be a non-empty string"),
];

//Skills
const validateResumeSkills = [
  body("resumeId")
    .trim()
    .notEmpty()
    .withMessage("Resume ID is required")
    .isUUID()
    .withMessage("Resume ID must be a valid UUID"),

  body("skills")
    .isArray({ min: 1 })
    .withMessage("Skills must be a non-empty array"),

  body("skills.*.skillId").isNumeric().withMessage("Skill ID must be a number"),

  body("skills.*.skillName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Skill name must be between 2 to 50 characters"),

  // body("skills.*.skillRating")
  //   .isInt({ min: 0, max: 100 })
  //   .withMessage("Skill rating must be a number between 0 and 100"),
];

//Softskills
const validateResumeSoftSkills = [
  body("resumeId")
    .trim()
    .notEmpty()
    .withMessage("Resume ID is required")
    .isUUID()
    .withMessage("Resume ID must be a valid UUID"),

  body("softSkills")
    .isArray({ min: 1 })
    .withMessage("SoftSkills must be a non-empty array"),

  body("softSkills.*.softSkillId").isNumeric().withMessage("Softskill ID must be a number"),

  body("softSkills.*.softSkillName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Softskill name must be between 2 to 50 characters"),

  // body("softSkills.*.softSkillRating")
  //   .isInt({ min: 0, max: 100 })
  //   .withMessage("Softskill rating must be a number between 0 and 100"),
];

const validateResumeHobbies = [
  body("resumeId")
    .trim()
    .notEmpty()
    .withMessage("Resume ID is required")
    .isUUID()
    .withMessage("Resume ID must be a valid UUID"),

  body("hobbies")
    .isArray({ min: 1 })
    .withMessage("Hobbies must be a non-empty array"),

  body("hobbies.*.hobbieId").isNumeric().withMessage("HobbieID must be a number"),

  body("hobbies.*.hobbieName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("HobbieName is required")
    // .isLength({ min: 2, max: 50 })
    // .withMessage("Softskill name must be between 2 to 50 characters"),

];

module.exports = {
  validateResumeTitle,
  validateResumePersonalDetails,
  validateResumeProject,
  validateResumeSummary,
  validateResumeExperience,
  validateResumeEducation,
  validateResumeCourse,
  validateResumeSkills,
  validateResumeSoftSkills,
  validateResumeHobbies
};



