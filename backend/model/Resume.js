const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  experienceId: { type: Number },
  experienceTitle: { type: String },
  companyName: { type: String },
  city: { type: String },
  state: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  currentlyWorking: { type: Boolean, default: false },
  description: { type: String },
});

const projectsSchema = new mongoose.Schema({
  projectId: { type: Number, },
  projectTitle: { type: String },
  companyName: { type: String, },
  duration: { type: String, },
  technology: { type: [String] },
  description: { type: String }
})

const educationSchema = new mongoose.Schema({
  educationId: { type: Number },
  universityName: { type: String },
  degree: { type: String },
  major: { type: String },
  CCGPA: { type: String },
  startDate: { type: String },
  endDate: { type: String },
})

const coursesSchema = new mongoose.Schema({
  courseId: { type: String },
  courseName: { type: String },
  institute: { type: String },
  location: { type: String },
  completedDate: { type: String },
  description: { type: String },
  Professionalskills: { type: [String] },
})


const skillsSchema = new mongoose.Schema({
  skillId: { type: Number },
  skillName: { type: String },
  // skillRating: { type: Number, min: 1, max: 100 }
})

const hobbiesSchema = new mongoose.Schema({
  hobbieId: { type: Number },
  hobbieName: { type: String },
})

const softSkillSchema = new mongoose.Schema({
  softSkillId: { type: String, trim: true },
  softSkillName: { type: String, trim: true },
  // softSkillRating: { type: Number, min: 1, max: 100, default: 50 },
})

;

const userResumesSchema = new mongoose.Schema(
  {
    resumeId: { type: String, required: true, unique: true },
    resumeTitle: { type: String, trim: true, required: true },
    userName: { type: String, trim: true, required: true },
    userEmail: { type: String, trim: true, lowercase: true, required: true },

    personalDetails: {
      type: {
        firstName: { type: String, trim: true, default: "" },
        lastName: { type: String, trim: true, default: "" },
        jobTitle: { type: String, trim: true, default: "" },
        address: { type: String, trim: true, default: "" },
        phone: { type: String, trim: true, default: "" },
        email: { type: String, trim: true, lowercase: true, default: "" },
        pincode: { type: String, trim: true, default: "" },
        github: { type: String, trim: true, default: "" },
        linkedin: { type: String, trim: true, default: "" },
        portfolio: { type: String, trim: true, default: "" },
      },
      default: {}
    },

    summary: { type: String, trim: true, default: " " },

    experience: [experienceSchema], default: {},

    projects: [projectsSchema], default: {},

    education: [educationSchema], default: {},

    courses: [coursesSchema], default: {},

    skills: [skillsSchema], default: {},

    softSkills: [softSkillSchema], default: {},

    hobbies: [hobbiesSchema], default: {},
    
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "SHARP_RESUMEAI_RESUMES",
  userResumesSchema,
  "SHARP_RESUMEAI_RESUMES"
);
