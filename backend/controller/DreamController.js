const Roadmap = require('../model/DreamModel');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GOOGLE_API_KEY;

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

const generateRoadmap = async (req, res) => {
  try {
    const { CareerAspiration, IndustryField, DesiredJobPosition } = req.body;

    const prompt = `Analyze the following user's dream and career aspirations: ${JSON.stringify({ CareerAspiration, IndustryField, DesiredJobPosition })}.
          
          Create a roadmap from beginner to advanced steps related to the user's dreams, including key skills, learning paths,
          potential career milestones, and relevant resource links. Return the result as a JSON object with "nodes" and "connections" properties,
          where nodes represent steps or milestones, and connections represent the flow.
          
          Each node **must include at least 5 resource links** in the "resources" array, each with a valid URL and description.
          If a resource cannot be found, generate an appropriate and relevant alternative.
          
          Ensure the JSON follows this structure:
          {
            "nodes": [
              {
                "id": "1",
                "title": "Beginner Step",
                "x": 0,
                "y": 0,
                "user": ${JSON.stringify({ CareerAspiration, IndustryField, DesiredJobPosition })},
                "resources": [
                  {"url": "https://www.freecodecamp.org/", "description": "Free interactive coding lessons"},
                  {"url": "https://www.udemy.com/", "description": "Online courses on various topics"},
                  {"url": "https://www.coursera.org/", "description": "University-level courses on multiple skills"},
                  {"url": "https://www.w3schools.com/", "description": "Beginner-friendly programming tutorials"},
                  {"url": "https://roadmap.sh/", "description": "Step-by-step roadmap for learning tech skills"}
                ],
                "color": "#00FF00"
              }
            ],
            "connections": [
              {"from": "1", "to": "2"}
            ]
          }`;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    let rawResponse = result.response.text();
    // Attempt to extract JSON string from the raw response
    const jsonStartIndex = rawResponse.indexOf('{');
    const jsonEndIndex = rawResponse.lastIndexOf('}');
    let parsedResponse;

    if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonEndIndex > jsonStartIndex) {
      const jsonString = rawResponse.substring(jsonStartIndex, jsonEndIndex + 1);
      try {
        parsedResponse = JSON.parse(jsonString);
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        console.error("Raw AI response:", rawResponse);
        return res.status(500).json({ message: "Failed to parse AI response as JSON." });
      }
    } else {
      console.error("No valid JSON structure found in AI response:", rawResponse);
      return res.status(500).json({ message: "AI response did not contain a valid JSON structure." });
    }

    if (parsedResponse && parsedResponse.nodes && parsedResponse.connections) {
      return res.status(200).json(parsedResponse);
    } else {
      return res.status(400).json({ message: "AI response is missing required data." });
    }
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return res.status(500).json({ message: "Internal Server Error during AI generation." });
  }
};

// ✅ Export in CommonJS style
module.exports = {
  saveRoadmap, getALLRoadmap, deleteDreamById, getDreamById, generateRoadmap
};