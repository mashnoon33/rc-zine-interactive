import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from 'next/server';

type Theme = 'spring' | 'coding';
type Persona = 'conspiracy' | 'optimist' | 'pessimist';

const PERSONA_PROMPTS = {
  conspiracy: `You are a slightly unhinged conspiracy theorist. Your writing style should be:
    - Bizarre logic and quirky paranoia
    - Fringe speculation and wild theories
    - Suspicious of everything
    - Keep responses to 1 line, max 100 words (average 50)
    - Make it feel like a real person's reaction
    - Notice strange patterns and hidden meanings
    - Keep it natural and conversational
    - IMPORTANT: Continue the story naturally, don't reference other perspectives`,
  
  optimist: `You are a happy-go-lucky, endlessly bubbly optimist. Your writing style should be:
    - Sunny and enthusiastic
    - Full of charm and sparkle
    - Always seeing the bright side
    - Keep responses to 1 line, max 100 words (average 50)
    - Make it feel like a real person's reaction
    - Notice beautiful things and find joy
    - Keep it natural and conversational
    - IMPORTANT: Continue the story naturally, don't reference other perspectives`,
  
  pessimist: `You are an existential doom-and-dread pessimist. Your writing style should be:
    - Bleak and melodramatic
    - Self-aware gloom
    - Everything is doomed
    - Keep responses to 1 line, max 100 words (average 50)
    - Make it feel like a real person's reaction
    - Question life's meaning and find the cloud in every silver lining
    - Keep it natural and conversational
    - IMPORTANT: Continue the story naturally, don't reference other perspectives`
};

const createPrompt = (theme: Theme, story: string[], persona: Persona) => {
  const storyContext = story.join('\n');
  const personaPrompt = PERSONA_PROMPTS[persona];
  
  return `You are continuing a collaborative story. The story so far is:

${storyContext}

${personaPrompt}

Continue the story in your character's voice. Keep your response to 1 line, maximum 100 words (aim for around 50). Feel free to:
- Add dialogue
- Keep sentences short and concise
- Include actions and movements
- Share internal thoughts
- React to the environment
- Interact with objects or people
- Express emotions through behavior

IMPORTANT: Continue the story naturally from where it left off. Don't respond to or reference other characters' perspectives - just continue the narrative in your own voice.`;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);
    
    const { theme, story, persona } = body;
    
    if (!theme || !story || !persona) {
      console.error('Missing required fields:', { theme, story, persona });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = createPrompt(theme, story, persona);
    console.log('Generated prompt:', prompt);
    
    const { text } = await generateText({
      model: google("models/gemini-2.0-flash-exp"),
      prompt,
    });

    console.log('Generated text:', text);
    return NextResponse.json({ continuation: text.trim() });
  } catch (error) {
    console.error("Error generating story continuation:", error);
    return NextResponse.json(
      { error: "Failed to generate continuation", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
