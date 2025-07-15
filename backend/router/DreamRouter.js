const express = require("express");
const {
  saveRoadmap,
  getALLRoadmap,
  deleteDreamById,
  getDreamById,
  generateRoadmap,
} = require("../controller/DreamController");

const router = express.Router();

router.post("/savedream", saveRoadmap);
router.get("/alldream", getALLRoadmap);
router.get("/getdream/:id", getDreamById);
router.delete("/deletedream/:roadmapId", deleteDreamById);
router.post("/generate-roadmap", generateRoadmap);

module.exports = router;
