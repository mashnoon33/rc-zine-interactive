'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/database.types';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type Story = Database['public']['Tables']['story']['Row'];

export default function StorySoFar() {
  const [springStory, setSpringStory] = useState<string[]>([]);
  const [codingStory, setCodingStory] = useState<string[]>([]);
  const supabase = createClient();

  // Load initial stories
  useEffect(() => {
    const loadStories = async () => {
      // Load spring story
      const { data: springData, error: springError } = await supabase
        .from('story')
        .select('*')
        .eq('type', 'spring')
        .order('created_at', { ascending: false })
        .limit(1);

      if (springError) {
        console.error('Error loading spring story:', springError);
      } else if (springData && springData.length > 0) {
        setSpringStory(springData[0].story);
      }

      // Load coding story
      const { data: codingData, error: codingError } = await supabase
        .from('story')
        .select('*')
        .eq('type', 'coding')
        .order('created_at', { ascending: false })
        .limit(1);

      if (codingError) {
        console.error('Error loading coding story:', codingError);
      } else if (codingData && codingData.length > 0) {
        setCodingStory(codingData[0].story);
      }
    };

    loadStories();
  }, []);

  // Subscribe to story updates
  useEffect(() => {
    // Subscribe to spring story updates
    const springChannel = supabase
      .channel('spring_story_updates')
      .on(
        'postgres_changes' as any,
        {
          event: '*',
          schema: 'public',
          table: 'story',
          filter: 'type=eq.spring',
        },
        (payload: RealtimePostgresChangesPayload<Story>) => {
          if (payload.new && 'story' in payload.new) {
            setSpringStory(payload.new.story);
          }
        }
      )
      .subscribe();

    // Subscribe to coding story updates
    const codingChannel = supabase
      .channel('coding_story_updates')
      .on(
        'postgres_changes' as any,
        {
          event: '*',
          schema: 'public',
          table: 'story',
          filter: 'type=eq.coding',
        },
        (payload: RealtimePostgresChangesPayload<Story>) => {
          if (payload.new && 'story' in payload.new) {
            setCodingStory(payload.new.story);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(springChannel);
      supabase.removeChannel(codingChannel);
    };
  }, []);

  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
        {/* Spring Story */}
        <Card className="p-4 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-4">🌸 Spring Tales</h2>
          <ScrollArea className="flex-1 w-full rounded-md border p-4">
            {springStory.length > 0 ? (
              springStory.map((line, index) => (
                <p key={index} className="mb-2 text-2xl">
                  {line}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground text-2xl">No spring story yet...</p>
            )}
          </ScrollArea>
        </Card>

        {/* Coding Story */}
        <Card className="p-4 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-4">💻 Coding Adventures</h2>
          <ScrollArea className="flex-1 w-full rounded-md border p-4">
            {codingStory.length > 0 ? (
              codingStory.map((line, index) => (
                <p key={index} className="mb-2 text-2xl">
                  {line}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground text-2xl">No coding story yet...</p>
            )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
