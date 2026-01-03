const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateInterview = async (subjectName, skillLevel) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const prompt = `
      Act as a Senior Technical Interviewer. 
      Generate a Multiple Choice Question (MCQ) interview for a candidate with skill level: "${skillLevel}" in the subject: "${subjectName}".
      
      QUANTITY: 30 Questions.
      FORMAT: Each question must have 4 options and 1 correct answer index (0-3).

      JSON OUTPUT FORMAT:
      [
        {
          "question": "The question text",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "type": "technical",
          "difficulty": "${skillLevel}",
          "topic": "Sub-topic name",
          "explanation": "Brief explanation"
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("[Gemini Interview] Generation Error:", error);
    return [];
  }
};
module.exports = {
  generateInterview,
};
