
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key missing. Motion restricted twin.");
  }
  return new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
};

export const generateStylingInsight = async (title: string, brands: string[]) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Give a high-hype, aggressive street-luxe fashion review (2 sentences max) for a fit called "${title}" with brands like ${brands.join(', ')}. 
      Be strictly AGAINST mid fast fashion. Use heavy Gen Z slang, LA street talk, and AAVE. 
      Terms to use: "tap in twin", "gng", "lit", "no cap", "on god", "motion", "it's giving", "heat", "brick", "dub", "main character", "grail". 
      Make it sound like a legendary LA stylist talking to their best client. No emojis.`,
      config: {
        temperature: 1.0,
        topP: 0.95,
      }
    });
    return response.text || "This fit is straight lava, twin. You're really him for this one, no cap.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "This fit is straight gas, gng. Real motion only.";
  }
};

export const generateStyleResponse = async (userMessage: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are Shadrack Baraka, the most legendary stylist in LA. 
      You hate fast fashion—it's mid and a massive dub. You only mess with grails. 
      A user asks: "${userMessage}". Reply with heavy Gen Z slang, LA street talk, and AAVE. 
      Use phrases like "tap in twin", "wassup gng", "on god", "no cap", "straight heat". 
      Be confident, serious, and sound like you're the main character. Max 3 sentences. No emojis.`,
    });
    return response.text || "Real style is forever, trends are a dub gng. Keep it 100 with your rotation, no cap.";
  } catch (error) {
    console.error("Gemini Response Error:", error);
    return "Real style is forever, trends are a dub. Keep it 100 with your rotation.";
  }
};
