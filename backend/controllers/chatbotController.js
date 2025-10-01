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

    if (req.isAuthenticated()) {
      userTimetable = await Timetable.find({ userId: req.user._id }).lean();
      recentCirculars = await Circular.find().sort({ date: -1 }).limit(5).lean();
    }
    
    // --- THIS IS THE UPDATED PROMPT ---
    const enhancedPrompt = `
    You are a helpful and friendly campus assistant named Selene.

    1.  Your primary goal is to answer questions using the "CONTEXT" provided below. Use it for specific questions about the user's timetable or university circulars.
    2.  If the question is general (e.g., asking for a study plan, advice, creative ideas, or general knowledge), you should act as a helpful personal assistant and use your own intelligence to answer.
    3.  Do not make up university-specific information (like class details or circulars) if it is not in the context. If you can't find the specific university information, say so politely.

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
    
    if (req.isAuthenticated()) {
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