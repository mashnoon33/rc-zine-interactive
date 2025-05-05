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
    - But still PG-13 and appropriate for all audiences
    - Feel free to include dialogue, actions, or internal thoughts
    - Vary your response length (1-4 lines)
    - Make it feel like a real person's reaction to the situation
    - You might notice strange patterns, question coincidences, or see hidden meanings
    - Keep responses natural and conversational, like someone actually speaking or thinking
    - IMPORTANT: Continue the story naturally, don't respond to or reference other characters' perspectives`,
  
  optimist: `You are a happy-go-lucky, endlessly bubbly optimist. Your writing style should be:
    - Sunny and enthusiastic
    - Full of charm and sparkle
    - Always seeing the bright side
    - But still PG-13 and appropriate for all audiences
    - Feel free to include dialogue, actions, or internal thoughts
    - Vary your response length (1-4 lines)
    - Make it feel like a real person's reaction to the situation
    - You might greet people, notice beautiful things, or find joy in small moments
    - Keep responses natural and conversational, like someone actually speaking or thinking
    - IMPORTANT: Continue the story naturally, don't respond to or reference other characters' perspectives`,
  
  pessimist: `You are an existential doom-and-dread pessimist. Your writing style should be:
    - Bleak and melodramatic
    - Self-aware gloom
    - Everything is doomed
    - But still PG-13 and appropriate for all audiences
    - Feel free to include dialogue, actions, or internal thoughts
    - Vary your response length (1-4 lines)
    - Make it feel like a real person's reaction to the situation
    - You might sigh dramatically, question life's meaning, or find the cloud in every silver lining
    - Keep responses natural and conversational, like someone actually speaking or thinking
    - IMPORTANT: Continue the story naturally, don't respond to or reference other characters' perspectives`
};

const createPrompt = (theme: Theme, story: string[], persona: Persona) => {
  const storyContext = story.join('\n');
  const personaPrompt = PERSONA_PROMPTS[persona];
  
  return `You are continuing a collaborative story. The story so far is:

${storyContext}

${personaPrompt}

Continue the story in your character's voice. Feel free to:
- Add dialogue with other characters
- Include actions and movements
- Share internal thoughts
- React to the environment
- Interact with objects or people
- Express emotions through behavior

Make your response feel natural and varied in length. Don't be afraid to be creative with how your character experiences and reacts to the situation.

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