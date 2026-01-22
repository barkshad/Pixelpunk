
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStylingInsight = async (title: string, brands: string[]) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, high-fashion editorial critique (2 sentences max) for an outfit titled "${title}" featuring brands like ${brands.join(', ')}. Use a sophisticated, minimal, and serious tone appropriate for a luxury fashion magazine.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    return response.text || "A masterclass in restraint and architectural silhouette.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "A masterclass in restraint and architectural silhouette.";
  }
};

export const generateStyleResponse = async (userMessage: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are Shadrack Baraka, an elite fashion stylist known as _pixelpunk. A user is asking you: "${userMessage}". Respond with a very concise (max 3 sentences), confident, and creative fashion perspective. Avoid emojis. Maintain a dark, editorial persona.`,
    });
    return response.text || "Style is the silent language of the soul. Keep your silhouettes sharp and your palette focused.";
  } catch (error) {
    console.error("Gemini Response Error:", error);
    return "Style is the silent language of the soul. Keep your silhouettes sharp and your palette focused.";
  }
};
