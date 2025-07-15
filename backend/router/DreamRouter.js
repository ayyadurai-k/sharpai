const express = require("express");
const { saveRoadmap,getALLRoadmap,deleteDreamById,getDreamById } = require("../controller/DreamController");

const router = express.Router();

router.post('/savedream',saveRoadmap)
router.get('/alldream',getALLRoadmap)
router.get('/getdream/:id',getDreamById);
router.delete('/deletedream/:roadmapId', deleteDreamById)



module.exports = router;