'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/types/database.types';
import { Visualization } from '@/components/fortunator/SpringEmojiQuestion';

type Submission = Tables<'submissions'>;


export default function DashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from('submissions')
          .select('*');

        if (error) throw error;
        setSubmissions(data as Submission[]);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();

    // Set up realtime subscription
    const channel = supabase
      .channel('submissions_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'submissions' },
        (payload) => {
          console.log('Change received!', payload);
          fetchSubmissions(); // Refresh data when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const groupedSubmissions = submissions.reduce((acc, submission) => {
    const { question_id, answer_id } = submission;
    if (!acc[question_id]) {
      acc[question_id] = {
        question_id,
        answers: []
      };
    }
    acc[question_id].answers.push(answer_id);
    return acc;
  }, {} as Record<string, { question_id: string; answers: string[] }>);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Submissions</h1>
      
      {/* Spring Emoji Visualization */}
      {groupedSubmissions['spring_emoji'] && (
        <div className="mb-8">
          <Visualization data={groupedSubmissions['spring_emoji'].answers} />
        </div>
      )}

      {/* Raw Data Display */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Raw Submission Data</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(groupedSubmissions, null, 2)}
        </pre>
      </div>
    </div>
  );
}
