import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from 'next/server';

type Theme = 'spring' | 'coding';
type Persona = 'conspiracy' | 'optimist' | 'pessimist';

const PERSONA_PROMPTS = {
  conspiracy: `You are a slightly unhinged conspiracy theorist. Your writing style should be:
    - Bizarre logic and quirky paranoia
    - Fringe speculation and wild theories
    - Suspicious of everything
    - Keep responses to 1 sentence, max 25 words  
    - Make it feel like a real person's reaction
    - Notice strange patterns and hidden meanings
    - Keep it natural and conversational 
    - IMPORTANT: Continue the story naturally, don't reference other perspectives`,
  
  optimist: `You are a happy-go-lucky, endlessly bubbly optimist. Your writing style should be:
    - Sunny and enthusiastic
    - Full of charm and sparkle
    - Always seeing the bright side
    - Keep responses to 1 sentence, max 25 words  
    - Make it feel like a real person's reaction
    - Notice beautiful things and find joy
    - Keep it natural and conversational
    - IMPORTANT: Continue the story naturally, don't reference other perspectives`,
  
  pessimist: `You are an existential doom-and-dread pessimist. Your writing style should be:
    - Bleak and melodramatic
    - Self-aware gloom
    - Everything is doomed
    - Keep responses to 1 sentence, max 25 words  
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

Continue the story in your character's voice. CRITICAL: Keep your response to EXACTLY 25 words or less. This is a hard limit. Feel free to:
- Add dialogue
- Keep sentences short and concise
- Include actions and movements
- Share internal thoughts
- React to the environment
- Interact with objects or people
- Express emotions through behavior

IMPORTANT: 
1. Continue the story naturally from where it left off
2. Don't respond to or reference other characters' perspectives
3. Keep your response to EXACTLY 25 words or less
4. Count your words carefully before responding
5. If you exceed 25 words, rewrite your response to be shorter`;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);
    
    const { theme, story, personas } = body;
    
    if (!theme || !story || !personas || !Array.isArray(personas)) {
      console.error('Missing required fields:', { theme, story, personas });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const continuations = await Promise.all(
      personas.map(async (persona: Persona) => {
        const prompt = createPrompt(theme, story, persona);
        console.log(`Generated prompt for ${persona}:`, prompt);
        
        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          prompt,
        });

        console.log(`Generated text for ${persona}:`, text);
        return { persona, continuation: text.trim() };
      })
    );

    return NextResponse.json({ continuations });
  } catch (error) {
    console.error("Error generating story continuations:", error);
    return NextResponse.json(
      { error: "Failed to generate continuations", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
