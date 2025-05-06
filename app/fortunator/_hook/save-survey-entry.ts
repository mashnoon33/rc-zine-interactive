import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/database.types';

type Tables = Database['public']['Tables'];

export async function saveSurveyEntries(
  userId: string,
  entries: Array<{ questionId: string; answerId: string }>
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('submissions')
    .insert(
      entries.map(entry => ({
        user_id: userId,
        question_id: entry.questionId,
        answer_id: entry.answerId,
      }))
    )
    .select();

  if (error) {
    console.error('Error saving survey entries:', error);
    throw error;
  }

  return data;
}

export async function saveFortune(
  userId: string | null,
  fortuneText: string,
  haikuText: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('fortunes')
    .insert({
      user_id: userId,
      fortune_text: fortuneText,
      haiku_text: haikuText,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving fortune:', error);
    throw error;
  }

  return data;
}
