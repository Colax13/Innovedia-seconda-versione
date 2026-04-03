import { GoogleGenAI, Type } from "@google/genai";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- FALLBACK ASSETS (Used when API quota is exhausted) ---
// Using specific Unsplash IDs to maintain aesthetic quality rather than random noise
const FALLBACK_WELCOME = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"; // Modern futuristic office vibe
const FALLBACK_CREATIVE = "https://images.unsplash.com/photo-1560421683-6856ea585c78?q=80&w=800&auto=format&fit=crop"; // Colorful, artistic, messy
const FALLBACK_STRATEGY = "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?q=80&w=800&auto=format&fit=crop"; // Abstract geometric, strategic
const FALLBACK_WRITER = "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=2000&auto=format&fit=crop"; // Dark moody writing scene

/**
 * Generates the main Welcome Hero image.
 * A wide, welcoming shot of the character.
 */
export const generateWelcomeImage = async (): Promise<string | null> => {
    // Updated for B2B Context: Visualizing "Complex Goals -> Revenue"
    const prompt = "Pixar style 3d render wide shot. A cute teenage boy with messy blond hair and round glasses, wearing a sharp, futuristic business-casual blazer, standing in a massive, stunning high-tech glass office overlooking a neon city at twilight. He is gesturing confidently towards a giant floating hologram that shows complex blue knots untangling into golden upward-trending arrows. Cinematic lighting, volumetric fog, depth of field, 8k, masterpiece, disney animation style.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }]
            }
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return `data:image/png;base64,${part.inlineData.data}`;
                }
            }
        }
        return FALLBACK_WELCOME;
    } catch (error: any) {
        console.warn("Gemini API (Welcome Image): Using fallback due to error:", error.message || error);
        return FALLBACK_WELCOME;
    }
};

/**
 * Generates a Pixar-style image based on the specific type (Creative or Strategy).
 * Enforces the "blond boy" requirement.
 */
export const generatePixarImage = async (type: 'creative' | 'strategy'): Promise<string | null> => {
    // We define a consistent character base to keep the brand identity unified
    const characterBase = "cute teenage boy with messy blond hair and round glasses";
    
    let prompt = "";
    if (type === 'creative') {
        prompt = `Pixar style 3d render close up. The ${characterBase} is wearing a paint-splattered hoodie and floating in a zero-gravity magical art studio. He is surrounded by glowing liquid paint bubbles, flying sketchbooks, and neon light ribbons. He holds a high-tech glowing stylus. His expression is pure joy and inspiration. Lighting is volumetric cyan and magenta, dreamy and vibrant. 8k, masterpiece, disney animation style, subsurface scattering.`;
    } else {
        prompt = `Pixar style 3d render close up. The ${characterBase} is wearing a sharp, futuristic navy blue suit. He is standing in a dark, sleek command center. He is manipulating complex glowing purple and blue holographic chess pieces and data charts floating in the air. He looks focused, confident, and intelligent. Lighting is dramatic, cinematic purple rim lights, clean and sharp. 8k, masterpiece, disney animation style, subsurface scattering.`;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }]
            }
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return `data:image/png;base64,${part.inlineData.data}`;
                }
            }
        }
        return type === 'creative' ? FALLBACK_CREATIVE : FALLBACK_STRATEGY;
    } catch (error: any) {
        console.warn(`Gemini API (${type} Image): Using fallback due to error:`, error.message || error);
        return type === 'creative' ? FALLBACK_CREATIVE : FALLBACK_STRATEGY;
    }
};

/**
 * Generates a Pixar-style image of a writer mascot.
 * Updated to be a scene composition with the character on the left.
 */
export const generateWriterImage = async (): Promise<string | null> => {
    // Prompt engineered for a layout where the character is on the left and the right is empty/dark for text.
    const prompt = "Pixar style 3d render wide shot. A cute teenage boy with messy blond hair and round glasses wearing a cozy orange sweater is sitting on the left side of the frame at a floating desk in a magical void. He is writing in a glowing holographic notebook. Floating golden letters surround him. The background is a deep, dark teal digital void. The right side of the image is mostly dark negative space. Cinematic volumetric lighting, 8k, masterpiece, disney animation style.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }]
            }
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return `data:image/png;base64,${part.inlineData.data}`;
                }
            }
        }
        return FALLBACK_WRITER;
    } catch (error: any) {
        console.warn("Gemini API (Writer Image): Using fallback due to error:", error.message || error);
        return FALLBACK_WRITER;
    }
};

/**
 * Generates creative slogans for the hero section using Gemini.
 * Simulates the "Pixar" storytelling vibe.
 */
export const generateHeroSlogans = async (): Promise<{ creative: string; strategy: string }> => {
  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: "Scrivi due descrizioni incisive e stimolanti di 10 parole per un portfolio creativo. Una per 'Creatività' (stravagante, artistica) e una per 'Strategia' (intelligente, calcolata). Restituisci come JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            creative: { type: Type.STRING },
            strategy: { type: Type.STRING },
          },
          required: ["creative", "strategy"]
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    throw new Error("No text returned");
  } catch (error: any) {
    console.warn("Gemini API (Slogans): Using fallback due to error:", error.message || error);
    return {
      creative: "Comunicazione che colora l'immaginazione e dà vita alle idee.",
      strategy: "Mosse precise per la vittoria digitale e la costruzione di un brand forte."
    };
  }
};
