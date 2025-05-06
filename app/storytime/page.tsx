'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/database.types';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type Theme = 'spring' | 'coding';
type Persona = 'conspiracy' | 'optimist' | 'pessimist';
type Story = Database['public']['Tables']['story']['Row'];

interface StoryContinuation {
  text: string;
  persona: Persona;
}

export default function StoryTime() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [story, setStory] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [continuations, setContinuations] = useState<StoryContinuation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const supabase = createClient();

  const initialPrompts = {
    spring: "It's the first day of spring, and New York City is alive with a sunny blue sky and the smell of fresh cherry blossoms.",
    coding: "You've just woken up to find your computer crashed overnight. Problem? You nodded off before committing the last 24 hours of code you've been toiling at.",
  };

  // Load initial story from database
  useEffect(() => {
    const loadInitialStory = async () => {
      if (!selectedTheme) return;

      const { data: existingStories, error } = await supabase
        .from('story')
        .select('*')
        .eq('type', selectedTheme)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading story:', error);
        return;
      }

      if (existingStories && existingStories.length > 0) {
        setStory(existingStories[0].story);
      } else {
        // Create new story entry if it doesn't exist
        const newStory = [initialPrompts[selectedTheme]];
        const { error: insertError } = await supabase
          .from('story')
          .insert([{ type: selectedTheme, story: newStory }]);
        
        if (insertError) {
          console.error('Error creating story:', insertError);
        } else {
          setStory(newStory);
        }
      }
    };

    loadInitialStory();
  }, [selectedTheme]);

  // Subscribe to story updates
  useEffect(() => {
    if (!selectedTheme) return;

    const channel = supabase
      .channel('story_updates')
      .on(
        'postgres_changes' as any,
        {
          event: '*',
          schema: 'public',
          table: 'story',
          filter: `type=eq.${selectedTheme}`,
        },
        (payload: RealtimePostgresChangesPayload<Story>) => {
          if (payload.new && 'story' in payload.new) {
            setStory(payload.new.story);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedTheme]);

  // Add effect to generate continuations when theme changes
  useEffect(() => {
    if (selectedTheme && story.length > 0) {
      console.log('Theme or story changed, generating continuations...');
      generateContinuations();
    }
  }, [selectedTheme, story]);

  const generateContinuations = async () => {
    if (!selectedTheme) {
      console.log('No theme selected, skipping generation');
      return;
    }
    
    console.log('Starting to generate continuations...');
    setIsGenerating(true);
    try {
      const personas: Persona[] = ['conspiracy', 'optimist', 'pessimist'];
      
      const response = await fetch('/api/storytime/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: selectedTheme,
          story,
          personas,
        }),
      });

      if (!response.ok) {
        console.error('Failed to generate continuations:', response.statusText);
        throw new Error('Failed to generate continuations');
      }
      
      const { continuations } = await response.json();
      console.log('Generated continuations:', continuations);

      // Transform the continuations to match the expected format
      const formattedContinuations = continuations.map((c: { persona: Persona; continuation: string }) => ({
        text: c.continuation,
        persona: c.persona
      }));

      // Randomize the order of continuations
      const shuffledContinuations = [...formattedContinuations].sort(() => Math.random() - 0.5);
      console.log('All continuations generated (shuffled):', shuffledContinuations);
      setContinuations(shuffledContinuations);
    } catch (error) {
      console.error('Error generating continuations:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleThemeSelect = (theme: Theme) => {
    console.log('Theme selected:', theme);
    setSelectedTheme(theme);
  };

  const handleContinuationSelect = async (continuation: StoryContinuation) => {
    console.log('Continuation selected:', continuation);
    const newStory = [...story, continuation.text];
    
    const { error } = await supabase
      .from('story')
      .update({ story: newStory })
      .eq('type', selectedTheme);

    if (error) {
      console.error('Error updating story:', error);
    }
    
    setContinuations([]);
  };

  const handleUserSubmit = async () => {
    if (userInput.trim()) {
      console.log('User submitted:', userInput);
      const newStory = [...story, userInput.trim()];
      
      const { error } = await supabase
        .from('story')
        .update({ story: newStory })
        .eq('type', selectedTheme);

      if (error) {
        console.error('Error updating story:', error);
      }
      
      setUserInput('');
      setContinuations([]);
    }
  };

  if (!selectedTheme) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Pick a theme to continue the story...</h1>
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            size="lg"
            className="text-xl p-8"
            onClick={() => handleThemeSelect('spring')}
          >
            🌸 Spring Tales
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-xl p-8"
            onClick={() => handleThemeSelect('coding')}
          >
            💻 Coding Adventures
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {selectedTheme === 'spring' ? '🌸 Spring Tales' : '💻 Coding Adventures'}
        </h1>
        <Button variant="outline" onClick={() => setSelectedTheme(null)}>
          Change Theme
        </Button>
      </div>

      <Card className="p-4 mb-6">
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {story.map((line, index) => (
            <p key={index} className="mb-2">
              {line}
            </p>
          ))}
        </ScrollArea>
      </Card>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What happens next?</h2>
          
          {isGenerating ? (
            <div className="text-center py-4">Generating story continuations...</div>
          ) : continuations.length > 0 ? (
            <div className="space-y-4">
              {continuations.map((continuation, index) => (
                <Card
                  key={index}
                  className="p-4 cursor-pointer hover:bg-accent"
                  onClick={() => handleContinuationSelect(continuation)}
                >
                  <p>{continuation.text}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {continuation.persona === 'conspiracy' && '🛸 The Slightly Unhinged Conspiracy Theorist'}
                    {continuation.persona === 'optimist' && '🌞 The Happy-Go-Lucky Endlessly Bubbly Optimist'}
                    {continuation.persona === 'pessimist' && '☠️ The Existential Doom-and-Dread Pessimist'}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">No continuations available yet...</div>
          )}
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h2 className="text-xl font-semibold">Or write your own continuation</h2>
          <Textarea
            placeholder="Write your own continuation (up to 3 lines)..."
            value={userInput}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleUserSubmit}>Submit Your Continuation</Button>
        </div>
      </div>
    </div>
  );
} 
