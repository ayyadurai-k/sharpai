const express = require("express");
const {
  BasicDetailsSave,
  PersonalDetailsSave,
  AboutMeDetailsSave,
  updateSocialLinksSave,
  getRecruiterProfile,
  addResumePreview,
  getResumePreviewStats
} = require("../controller/RecuriterProfielController");
const router = express.Router();

router.post("/basicdetails", BasicDetailsSave);
router.post("/personaldetails", PersonalDetailsSave);
router.post("/aboutme", AboutMeDetailsSave);
router.post("/socallinks", updateSocialLinksSave);
router.get("/getprofile", getRecruiterProfile);
router.post('/add-resume-preview', addResumePreview);
router.get('/resume-preview-stats', getResumePreviewStats)

module.exports = router;
