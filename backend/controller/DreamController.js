const Roadmap = require('../model/DreamModel');


const saveRoadmap = async function (req, res) {
    try {
      const roadmapId = req.body.roadmapId;
      let roadmap = req.body.roadmap;
      const userInput = req.body.userInput;
  
      if (typeof roadmap === 'string') {
        roadmap = JSON.parse(roadmap);
      }
  
      const newRoadmap = new Roadmap({
        roadmapId: roadmapId,
        roadmap: roadmap,
        userInput: userInput,
      });
  
      await newRoadmap.save();
      res.status(201).json({ message: 'Roadmap saved successfully' });
    } catch (error) {
      console.error('Error saving roadmap:', error.message);
      res.status(500).json({ error: 'Failed to save roadmap' });
    }
  };

  const getALLRoadmap = async function (req, res) {
    try {
      const roadmaps = await Roadmap.find().sort({ createdAt: -1 });
      res.status(200).json(roadmaps);
    } catch (error) {
      console.error('Error fetching roadmaps:', error.message);
      res.status(500).json({ error: 'Failed to fetch roadmaps' });
    }
  };

  const getDreamById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const dream = await Roadmap.findOne({ roadmapId: id });
  
      if (!dream) {
        return res.status(404).json({ message: 'Dream not found' });
      }
  
      return res.status(200).json(dream);
    } catch (error) {
      console.error("Error retrieving dream by ID:", error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const deleteDreamById = async function (req, res) {
    try {
      const roadmapId = req.params.roadmapId;
      const result = await Roadmap.findOneAndDelete({ roadmapId: roadmapId });
  
      if (!result) {
        return res.status(404).json({ message: "Dream not found" });
      }
  
      res.status(200).json({ message: "Dream deleted successfully" });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// ✅ Export in CommonJS style
module.exports = {
  saveRoadmap,getALLRoadmap,deleteDreamById,getDreamById
};
 