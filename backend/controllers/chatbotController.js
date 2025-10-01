const { GoogleGenerativeAI } = require("@google/generative-ai");
const ChatLog = require('../models/ChatLog');
const Timetable = require('../models/Timetable');
const Circular = require('../models/Circular');

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in the .env file');
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResponse = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: "A prompt is required." });
    }

    let userTimetable = [];
    let recentCirculars = [];

    // req.user is available because Passport.js runs before your routes
    if (req.isAuthenticated()) {
      userTimetable = await Timetable.find({ userId: req.user._id }).lean();
      recentCirculars = await Circular.find().sort({ date: -1 }).limit(5).lean();
    }
    
    const enhancedPrompt = `
    You are a helpful campus assistant named Selene. Answer the user's question based ONLY on the context provided below.
    If the information is not in the context, say that you don't have that information. Do not make up answers.

    ---
    CONTEXT:

    This user's name is ${req.user ? req.user.firstName : 'the user'}.
    Today's date is ${new Date().toLocaleDateString()}.

    User's Timetable:
    ${JSON.stringify(userTimetable, null, 2)}

    Recent University Circulars:
    ${JSON.stringify(recentCirculars, null, 2)}

    ---

    USER'S QUESTION:
    ${prompt}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Log the interaction to the database
    if (req.isAuthenticated()) { // Only log if a user is logged in
        const newLog = new ChatLog({ query: prompt, response: text, userId: req.user._id });
        await newLog.save();
    }
    
    res.status(200).json({ success: true, response: text });

  } catch (error) {
    console.error("Error in generateResponse:", error);
    res.status(500).json({ success: false, message: "Failed to generate AI response." });
  }
};

module.exports = {
  generateResponse,
};