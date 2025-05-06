import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from 'next/server';

const ANSWER_LABELS = {
  energy: {
    ferret: 'Ferret on espresso',
    duck: 'Duck on pond',
    ikea: 'IKEA furniture in progress',
    null: 'NullPointerException',
  },
  tabs_spaces: {
    tabs: 'Tabs',
    spaces: 'Spaces',
    dont_at_me: "Don't @ me",
  },
  dev_environment: {
    garden: 'An overgrown garden',
    bicycle: 'A well-oiled bicycle',
    haunted: 'A haunted house',
    spreadsheet: 'A spreadsheet with feelings',
  },
} as const;

const getAnswerLabel = (questionId: string, value: any) => {
  if (!value) return '';
  const labels = ANSWER_LABELS[questionId as keyof typeof ANSWER_LABELS];
  return labels ? labels[value as keyof typeof labels] || value : value;
};

const createPrompt = (name: string, answers: Record<string, any>) => {
  // Check if all answers are undefined
  const hasNoPreferences = Object.values(answers).every(value => value === undefined);
  
  if (hasNoPreferences) {
    return `Generate a encouraging, maybe slightly sarcastic, definitely funny fortune for an engineering retreat participant. 
    Then, generate a haiku that captures the same sentiment and meaning as the fortune. The haiku should follow the traditional 5-7-5 syllable pattern.
    Format your response as:
    FORTUNE: [your fortune here]
    ---
    HAIKU:
    [first line]
    [second line]
    [third line]`;
  }

  return `Based on these developer preferences:
    Energy Level: ${getAnswerLabel('energy', answers['energy'])}
    Development Environment: ${getAnswerLabel('dev_environment', answers['dev_environment'])}
    Spring Emoji: ${answers['spring_emoji'] || '🌱'}
    Mood Color: ${answers['mood_color'] || 'rainbow'}
    A language they picked must go: ${answers['favorite_language'] || 'the one you choose'}
    Rage Quit Style: ${answers['rage_quit'] || 'never'}
    Generate a short, encouraging fortune about their coding future that incorporates their preferences. Keep it under 2 sentences and make it slightly sarcastic, very funny but ultimately positive.
    Then, create a haiku that mirrors the fortune's sentiment, following the traditional 5-7-5 syllable pattern.
    Format your response as:
    [your fortune here]
    ---
    [first line]
    [second line]
    [third line]`;
};

const parseResponse = (text: string) => {
  // Split the text into fortune and haiku parts
  const parts = text.split('---');
  
  // Extract the fortune (remove any leading/trailing text)
  const fortuneText = parts[0]
    .replace(/^.*?Your coding journey/, 'Your coding journey') // Remove any leading text
    .trim();

  // Extract the haiku lines
  const haikuLines = parts[1]
    ?.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.includes('In Haiku Form'))
    .slice(0, 3) || [];

  return { fortuneText, haikuLines };
};

export async function POST(request: Request) {
  try {
    const { name, answers } = await request.json();
    const prompt = createPrompt(name, answers);
    
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });

    const { fortuneText, haikuLines } = parseResponse(text);
    
    return NextResponse.json({ fortune: fortuneText, haiku: haikuLines });
  } catch (error) {
    console.error("Error generating fortune:", error);
    return NextResponse.json(
      {
        fortune: "Your coding journey will be filled with exciting discoveries and successful projects!",
        haiku: [
          "Code flows like water",
          "Bugs vanish in morning light",
          "Success blooms ahead"
        ]
      },
      { status: 500 }
    );
  }
} 