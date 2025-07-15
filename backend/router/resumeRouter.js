const express = require("express");
const {
  resumeTitleCreated,
  resumeAddPersonalDetails,
  resumeAddProjects,
  resumeAddSummary,
  resumeAddProfessionalExperience,
  resumeAddEducationDetails,
  resumeAddCourseDetails,
  resumeAddSkills,
  resumeAddSoftSkills,
  resumeGetAll,
  resumeDelete,
  resumeSingleIdGetDetails,
  resumeAddHobbies,
} = require("../controller/userResume");

const {
  validateResumeTitle,
  validateResumePersonalDetails,
  validateResumeProject,
  validateResumeSummary,
  validateResumeExperience,
  validateResumeEducation,
  validateResumeCourse,
  validateResumeSkills,
  validateResumeSoftSkills,
  validateResumeHobbies,
} = require("../middlewares/resumeValidation");


const router = express.Router();

router.post("/createdTitle", validateResumeTitle, resumeTitleCreated);

router.post(
  "/addPersonalDetails",
  validateResumePersonalDetails,
  resumeAddPersonalDetails
);

router.post("/addProjectDetails", validateResumeProject, resumeAddProjects);

router.post("/addSummary", validateResumeSummary, resumeAddSummary);

router.post(
  "/addExperience",
  validateResumeExperience,
  resumeAddProfessionalExperience
);

router.post(
  "/addEducation",
  validateResumeEducation,
  resumeAddEducationDetails
);

router.post("/addCourse", validateResumeCourse, resumeAddCourseDetails);

router.post("/addSkills", validateResumeSkills, resumeAddSkills);

router.post("/addSoftSkills", validateResumeSoftSkills, resumeAddSoftSkills);

router.get("/getall-filters", resumeGetAll);

router.get("/singleGetResume", resumeSingleIdGetDetails);

router.delete("/delete/:resumeId", resumeDelete);

// hobbies
router.post("/addHobbies", validateResumeHobbies, resumeAddHobbies);
  




module.exports = router;
