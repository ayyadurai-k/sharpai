const express = require("express");
const {
  register,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword,
  getUserResumeData} = require("../controller/RecuriterController");


const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);
router.get("/resumes", getUserResumeData);



module.exports = router;
