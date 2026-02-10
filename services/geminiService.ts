import { GoogleGenAI, Type } from "@google/genai";
import { TaskPriority } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

interface AISuggestion {
  description: string;
  priority: TaskPriority;
}

export const generateTaskSuggestion = async (title: string): Promise<AISuggestion | null> => {
  if (!ai) {
    console.warn("Gemini API Key is missing.");
    return null;
  }

  try {
    const model = ai.models;
    const prompt = `
      Act as a project manager assistant. Given the task title "${title}", 
      generate a professional, concise description (max 2 sentences) and suggest a priority level (BAIXA, MEDIA, or ALTA).
      
      Respond in JSON format.
    `;

    const response = await model.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            priority: { type: Type.STRING, enum: ['BAIXA', 'MEDIA', 'ALTA'] }
          },
          required: ['description', 'priority']
        }
      }
    });

    const text = response.text;
    if (text) {
      const data = JSON.parse(text);
      return {
        description: data.description,
        priority: data.priority as TaskPriority
      };
    }
    return null;

  } catch (error) {
    console.error("Error generating task suggestion:", error);
    return null;
  }
};