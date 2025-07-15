const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  UserDashbardData,
  UserlistData,
  UsersearchQuery,
  calculateAndStoreDailyActiveUsers,
  useralldetaills,
 
} = require("../controller/AdminController");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

// Register Route
router.post("/register", registerAdmin);

// Login Route
router.post("/login", loginAdmin);

// Dashboard Route
router.get("/dashboard", authMiddleware, UserDashbardData, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

router.get("/useractivites",authMiddleware,calculateAndStoreDailyActiveUsers)

// user list Route
router.get("/userlist",authMiddleware, UserlistData);

router.get("/search",authMiddleware,UsersearchQuery);

router.get('/userresume-download',authMiddleware,useralldetaills)



// router.get("/dailystudenttracking", authMiddleware, UserDailytracking);

module.exports = router;
