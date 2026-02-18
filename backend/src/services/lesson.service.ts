import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ========================
   GENERATE LESSON
======================== */

export async function generateLesson(topic: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const prompt = `
You are an expert space teacher.

Create a 3-section interactive lesson about "${topic}" for children.

Rules:
- Make it fun and simple.
- Each section must have a heading, content, and an emoji.
- Content must be accurate.
- Do not include markdown.
- Return ONLY valid JSON.

Format:

{
  "title": "string",
  "sections": [
    {
      "heading": "string",
      "content": "string",
      "emoji": "emoji"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("Gemini Lesson Raw:", text);

    const match = text.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("Invalid JSON from Gemini");
    }

    const parsed = JSON.parse(match[0]);

    if (!parsed.title || !Array.isArray(parsed.sections)) {
      throw new Error("Malformed lesson structure");
    }

    return parsed;

  } catch (error: any) {
    console.error("Lesson Generation Error:", error.message);

    return fallbackLesson(topic);
  }
}

/* ========================
   EXPAND LESSON SECTION
======================== */

export async function expandLesson(sectionContent: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
Expand this lesson section with deeper explanation but keep it child-friendly:

"${sectionContent}"

Return plain text only.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return text.trim();

  } catch (error: any) {
    console.error("Expand Service Error:", error.message);
    throw error;
  }
}

/* ========================
   FALLBACK LESSON
======================== */

function fallbackLesson(topic: string) {
  return {
    title: `Learning about ${topic}`,
    sections: [
      {
        heading: "Introduction",
        content: `Let’s explore the fascinating world of ${topic}! Space is full of wonders and exciting discoveries.`,
        emoji: "🌌",
      },
      {
        heading: "Why It Matters",
        content: `${topic} helps us understand how the universe works and our place in it.`,
        emoji: "🚀",
      },
      {
        heading: "Fun Fact",
        content: `Scientists are still discovering new things about ${topic} every year!`,
        emoji: "✨",
      },
    ],
  };
}
