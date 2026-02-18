import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const TOPICS_INFO: Record<string, string> = {
  "solar-system": "planets, moons, asteroids, and solar system structure",
  "stars": "star formation, life cycles, constellations",
  "black-holes": "event horizons, gravity, space-time distortion",
  "galaxies": "Milky Way, galaxy types, structure",
  "moon": "phases, lunar surface, moon landing",
  "mars": "Mars geology, rovers, atmosphere",
  "space-exploration": "astronauts, spacecraft, ISS",
  "astronomy-basics": "telescopes and basic space observation"
};

function extractJSON(text: string) {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in Gemini response");

  return JSON.parse(match[0]);
}

function validateQuestion(q: any): QuizQuestion | null {
  try {
    if (
      typeof q.question === "string" &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      typeof q.correctAnswer === "string" &&
      typeof q.explanation === "string" &&
      q.options.includes(q.correctAnswer)
    ) {
      return {
        question: q.question.trim(),
        options: q.options.map((o: string) => o.trim()),
        correctAnswer: q.correctAnswer.trim(),
        explanation: q.explanation.trim()
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateQuiz(
  topic: string,
  difficulty: "easy" | "medium" | "hard" = "medium"
): Promise<QuizQuestion[]> {
  try {
    console.log("Generating quiz with Gemini...");

    const topicContext = TOPICS_INFO[topic] || topic;

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7
      }
    });

    const prompt = `
You are an expert space educator.

STRICTLY generate quiz questions ONLY about this topic:

"${topicContext}"

Do NOT generate generic solar system questions.
Do NOT repeat common space trivia.
Every question must be clearly related to "${topicContext}".

Difficulty level: ${difficulty}

Requirements:
- Exactly 5 multiple-choice questions
- 4 options per question
- correctAnswer must EXACTLY match one option
- Fun and child-friendly explanation
- Scientifically accurate
- No markdown formatting

Return ONLY valid JSON:

{
  "questions": [
    {
      "question": "string",
      "options": ["A","B","C","D"],
      "correctAnswer": "exact option text",
      "explanation": "short explanation"
    }
  ]
}
`;


    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("Gemini Raw Response:", text);

    const parsed = extractJSON(text);

    let validQuestions: QuizQuestion[] = [];

    if (Array.isArray(parsed.questions)) {
      parsed.questions.forEach((q: any) => {
        const validated = validateQuestion(q);
        if (validated) validQuestions.push(validated);
      });
    }

    // Fill missing questions with fallback
    if (validQuestions.length < 5) {
      console.warn("Gemini returned incomplete quiz. Filling with fallback.");
      const fallback = fallbackQuiz();
      const needed = 5 - validQuestions.length;
      validQuestions = [...validQuestions, ...fallback.slice(0, needed)];
    }

    return validQuestions;

  } catch (error: any) {
    console.error("Gemini Quiz Generation Error:", error.message);
    console.warn("Using full fallback quiz.");
    return fallbackQuiz();
  }
}

function fallbackQuiz(): QuizQuestion[] {
  return [
    {
      question: "How many planets are in our solar system?",
      options: ["7", "8", "9", "10"],
      correctAnswer: "8",
      explanation: "There are 8 planets orbiting our Sun!"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      explanation: "Mars appears red because of iron oxide (rust) in its soil."
    },
    {
      question: "Which planet is the largest?",
      options: ["Earth", "Saturn", "Jupiter", "Neptune"],
      correctAnswer: "Jupiter",
      explanation: "Jupiter is so large that over 1,300 Earths could fit inside it!"
    },
    {
      question: "What galaxy do we live in?",
      options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
      correctAnswer: "Milky Way",
      explanation: "Our solar system is part of the Milky Way galaxy."
    },
    {
      question: "What powers the Sun?",
      options: ["Burning gas", "Electricity", "Nuclear fusion", "Lava"],
      correctAnswer: "Nuclear fusion",
      explanation: "The Sun shines because nuclear fusion happens in its core."
    }
  ];
}
