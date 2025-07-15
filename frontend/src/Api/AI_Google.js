import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;


const apiKey =  "AIzaSyAUD0_lbCNGNQfweERSsXniHmzsyUDIt5E";

if (!apiKey) {
    throw new Error("Google AI API key is missing! Please set VITE_GOOGLE_AI_API_KEY in your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

// Start AI Chat Session (Ensure it's handled properly)
export const AIChatSession = model.startChat({
    generationConfig,
    history: [],
})

