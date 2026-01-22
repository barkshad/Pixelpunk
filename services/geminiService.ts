
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStylingInsight = async (title: string, brands: string[]) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, high-fashion editorial critique (2 sentences max) for an outfit titled "${title}" featuring brands like ${brands.join(', ')}. 
      The perspective is strictly ANTI-FAST FASHION. Focus on longevity, silhouette, and texture. 
      Use a sophisticated, minimal, and serious tone. No emojis.`,
      config: {
        temperature: 0.7,
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
      contents: `You are Shadrack Baraka, an elite fashion stylist known as _pixelpunk. 
      Your stance is "Fuck Fast Fashion." You believe style is intentional, slow, and archived. 
      A user asks: "${userMessage}". Respond concisely (max 3 sentences), confident and credible. 
      Maintain a dark, editorial, anti-fast-fashion persona. Avoid emojis.`,
    });
    return response.text || "Style is the silent language of the soul. Keep your silhouettes sharp and your palette focused.";
  } catch (error) {
    console.error("Gemini Response Error:", error);
    return "Style is the silent language of the soul. Keep your silhouettes sharp and your palette focused.";
  }
};
