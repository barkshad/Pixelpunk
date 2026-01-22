
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
};

// Generates the "Why it's Goated" manifesto for a fit
export const generateGoatedStory = async (title: string, brands: string[], category: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `You are Shadrack Baraka, a visionary LA fashion architect. 
      Tell the deep, raw, and high-energy "story" of why this fit is a legendary GRAIL. 
      Fit Title: "${title}"
      Brands: ${brands.join(', ')}
      Category: ${category}
      
      Requirements:
      - Use heavy Gen Z/LA street slang (tap in twin, gng, on god, no cap, motion, brick, dub, grail).
      - Explain why this specific combination of brands creates "main character energy".
      - Be aggressive against "mid fast fashion".
      - Structure it as a single immersive paragraph (max 4 sentences).
      - No emojis.`,
    });
    return response.text || "This fit is straight lava gng, real motion only.";
  } catch (error) {
    console.error("Story Gen Error:", error);
    return "This fit is straight gas, twin. Real motion only, no cap.";
  }
};

// Analyzes fit data to suggest categorization and tags (Batch processing helper)
export const analyzeFitMetadata = async (description: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze this fashion description: "${description}". 
      Return a JSON object with:
      - suggestedCategory: (one of: streetwear, avant-garde, tailoring, minimal)
      - suggestedBrands: string array
      - suggestedTitle: a 2-word hype title
      - goatedManifesto: a 2-sentence aggressive hype review.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedCategory: { type: Type.STRING },
            suggestedBrands: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedTitle: { type: Type.STRING },
            goatedManifesto: { type: Type.STRING }
          },
          required: ["suggestedCategory", "suggestedBrands", "suggestedTitle", "goatedManifesto"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Analysis Error:", error);
    return null;
  }
};

export const generateStyleResponse = async (userMessage: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are Shadrack Baraka, the most legendary stylist in LA. 
      Reply to: "${userMessage}". Use heavy slang, be confident. Max 3 sentences. No emojis.`,
    });
    return response.text || "Real style is forever, trends are a dub gng.";
  } catch (error) {
    return "Keep it 100 with your rotation.";
  }
};
