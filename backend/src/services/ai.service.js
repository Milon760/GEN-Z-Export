const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generateAiContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "models/gemini-flash-latest",
      contents: prompt,
    });
    return response.text;
  } catch (primaryError) {
    console.warn("Primary AI model unavailable, attempting fallback...");
    const fallbackResponse = await ai.models.generateContent({
      model: "models/gemini-3.5-flash",
      contents: prompt,
    });
    return fallbackResponse.text;
  }
};
