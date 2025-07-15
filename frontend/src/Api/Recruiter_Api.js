// ServersideApi.js
import axios from "axios";

const Backend = {
  RecruiterRegister: (data) =>
    axios.post(
      "https://resumeai-backend-node-vite-tx0y.onrender.com/api/recruiter/register",
      data
    ),
  RecuriterVerifycode: (data) =>
    axios.post(
      "https://resumeai-backend-node-vite-tx0y.onrender.com/api/recruiter/verify-otp",
      data
    ),
  RecuriterLogin: (data) =>
    axios.post(
      "https://resumeai-backend-node-vite-tx0y.onrender.com/api/recruiter/login",
      data
    ),
  RecuriterForgotpassword: (data) =>
    axios.post(
      "https://resumeai-backend-node-vite-tx0y.onrender.com/api/recruiter/forgotpassword",
      data
    ),
  RecuriterResetpassword: ({ token, newPassword, confirmPassword }) =>
    axios.post(
      `https://resumeai-backend-node-vite-tx0y.onrender.com/api/recruiter/resetpassword/${token}`,
      {
        newPassword,
        confirmPassword,
      }
    ),
  RecuriterDashboard: (data) =>
    axios.get(
      "https://resumeai-backend-node-vite-tx0y.onrender.com/api/recuriter/profile/resume-preview-stats"
    ),

  Recuriterresumepreview: (data) =>
    axios.post(
      "https://resumeai-backend-node-vite-tx0y.onrender.com/api/recuriter/profile/add-resume-preview",
      data
    ),

  Recuriterprofile: (data) =>
    axios.get(
      `https://resumeai-backend-node-vite-tx0y.onrender.com/api/recuriter/profile/getprofile?userId=${data}`
    ),
  RecuriterBasicsdetails: (data) =>
    axios.post(
      "https://resumeai-backend-node-vite-tx0y.onrender.com/api/recuriter/profile/basicdetails",
      data
    ),
  Recuriteraboutmedetails: (data) =>
    axios.post(
      "https://resumeai-backend-node-vite-tx0y.onrender.com/api/recuriter/profile/aboutme",
      data
    ),
  Recuriterperonaldetails: (data) =>
    axios.post(
      "https://resumeai-backend-node-vite-tx0y.onrender.com/api/recuriter/profile/personaldetails",
      data
    ),
  Recuritersociallinks: (data) =>
    axios.post(
      "https://resumeai-backend-node-vite-tx0y.onrender.com/api/recuriter/profile/socallinks",
      data
    ),
};

export default Backend;
