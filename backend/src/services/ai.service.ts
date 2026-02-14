import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const TOPICS_INFO: Record<string, string> = {
  'solar-system': 'planets, moons, asteroids, and the structure of our solar system',
  'stars': 'star formation, life cycles, types of stars, constellations',
  'black-holes': 'black holes, event horizons, gravitational pull, space-time',
  'galaxies': 'types of galaxies, Milky Way, galaxy formation and structure',
  'moon': 'Earth\'s moon, phases, lunar surface, moon landing',
  'mars': 'Mars planet, rovers, Martian atmosphere and geology',
  'space-exploration': 'spacecraft, astronauts, missions, ISS',
  'astronomy-basics': 'telescopes, observing space, basic astronomy concepts'
};

export async function generateQuiz(
  topic: string, 
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): Promise<QuizQuestion[]> {
  const topicContext = TOPICS_INFO[topic] || topic;
  
  const difficultyGuide = {
    easy: 'simple facts and basic concepts, suitable for ages 6-8',
    medium: 'interesting facts with some reasoning, suitable for ages 9-11',
    hard: 'complex concepts and critical thinking, suitable for ages 12+'
  };

  const prompt = `You are an expert space educator creating a fun quiz for children. 

Topic: ${topicContext}
Difficulty: ${difficulty} (${difficultyGuide[difficulty]})

Create exactly 5 multiple-choice questions. Make them:
- Fun and engaging for kids
- Educational but not boring
- Age-appropriate
- Fact-based (no made-up information)

CRITICAL: Return ONLY valid JSON with no markdown formatting, no code blocks, no explanation.

Use this EXACT format:
{
  "questions": [
    {
      "question": "What is the largest planet in our solar system?",
      "options": ["Mars", "Jupiter", "Saturn", "Neptune"],
      "correctAnswer": "Jupiter",
      "explanation": "Jupiter is the largest planet and could fit over 1,300 Earths inside it!"
    }
  ]
}

Make explanations fun and memorable for kids!`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2500,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from AI');
    }

    // Extract JSON from response (handle potential markdown)
    let jsonText = content.text.trim();
    
    // Remove markdown code blocks if present
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Find JSON object
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('AI Response:', content.text);
      throw new Error('No valid JSON found in AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    if (!parsed.questions || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      throw new Error('Invalid quiz structure in AI response');
    }

    // Validate each question
    parsed.questions.forEach((q: any, index: number) => {
      if (!q.question || !q.options || !Array.isArray(q.options) || 
          q.options.length !== 4 || !q.correctAnswer || !q.explanation) {
        throw new Error(`Invalid question structure at index ${index}`);
      }
    });

    return parsed.questions;
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    
    // Fallback quiz if AI fails
    return getFallbackQuiz(topic);
  }
}

function getFallbackQuiz(topic: string): QuizQuestion[] {
  const fallbacks: Record<string, QuizQuestion[]> = {
    'solar-system': [
      {
        question: "How many planets are in our solar system?",
        options: ["7", "8", "9", "10"],
        correctAnswer: "8",
        explanation: "There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune!"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
        explanation: "Mars looks red because of rusty iron in its soil!"
      },
      {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        correctAnswer: "Mercury",
        explanation: "Mercury is the closest planet to the Sun and also the smallest planet!"
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
        correctAnswer: "Jupiter",
        explanation: "Jupiter is so big that over 1,300 Earths could fit inside it!"
      },
      {
        question: "Which planet has beautiful rings around it?",
        options: ["Mars", "Jupiter", "Saturn", "Neptune"],
        correctAnswer: "Saturn",
        explanation: "Saturn has the most spectacular rings made of ice and rock!"
      }
    ]
  };

  return fallbacks[topic] || fallbacks['solar-system'];
}