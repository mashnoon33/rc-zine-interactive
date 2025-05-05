import { generateText } from "ai";
import { google } from "@ai-sdk/google";
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
    return `Generate an encouraging fortune for a new coder starting their journey. The fortune should be optimistic and inspiring, focusing on the potential and possibilities of learning to code. Keep it under 2 sentences.
    Then, generate a haiku that captures the same sentiment and meaning as the fortune. The haiku should follow the traditional 5-7-5 syllable pattern.
    Format your response as:
    FORTUNE: [your fortune here]
    HAIKU:
    [first line]
    [second line]
    [third line]`;
  }

  return `Based on these developer preferences:
    Name: ${name || 'A new coder'}
    Energy Level: ${getAnswerLabel('energy', answers['energy'])}
    Code Style: ${getAnswerLabel('tabs_spaces', answers['tabs_spaces'])}
    Development Environment: ${getAnswerLabel('dev_environment', answers['dev_environment'])}
    Spring Emoji: ${answers['spring_emoji'] || '🌱'}
    Mood Color: ${answers['mood_color'] || 'rainbow'}
    Favorite Language: ${answers['favorite_language'] || 'the one you choose'}
    Pairing Preference: ${answers['pairing'] || 'open to collaboration'}
    Rage Quit Style: ${answers['rage_quit'] || 'never'}
    Debugging Soundtrack: ${answers['debugging_soundtrack'] || 'the sound of success'}
    First, generate a short, optimistic, and encouraging fortune about their coding future. Keep it under 2 sentences.
    Then, generate a haiku that captures the same sentiment and meaning as the fortune. The haiku should follow the traditional 5-7-5 syllable pattern.
    Format your response as:
    FORTUNE: [your fortune here]
    HAIKU:
    [first line]
    [second line]
    [third line]`;
};

const parseResponse = (text: string) => {
  // Split the text into fortune and haiku parts
  const parts = text.split('In Haiku Form');
  
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
      model: google("models/gemini-2.0-flash-exp"),
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