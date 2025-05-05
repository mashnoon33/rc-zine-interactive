import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/database.types';

type Tables = Database['public']['Tables'];

export async function saveFortune(
  userId: string | null,
  fortuneText: string,
  haikuText: string[]
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('fortunes')
    .insert({
      user_id: userId,
      fortune_text: fortuneText,
      haiku_text: haikuText.join('\n'),
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving fortune:', error);
    throw error;
  }

  return data;
}
