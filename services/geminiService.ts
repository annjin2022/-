
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function processWish(wish: string): Promise<any> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User wish for Christmas: "${wish}". 
      As a luxury brand concierge (Arix), generate a poetic response and describe a unique golden ornament that would represent this wish on our tree. 
      Keep the tone extremely sophisticated, artistic, and brief.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING },
            ornamentDescription: { type: Type.STRING },
            giftIdea: { type: Type.STRING }
          },
          required: ["message", "ornamentDescription", "giftIdea"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      message: "May your holidays be as radiant as the Arix gold.",
      ornamentDescription: "A crystal sphere containing a single frozen flame.",
      giftIdea: "A curated selection of artisanal teas."
    };
  }
}
