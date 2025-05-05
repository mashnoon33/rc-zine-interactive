'use client';

import { useFortunator, ANSWER_LABELS, QuestionKey, QUESTIONS } from '../layout';
import { useEffect, useState, useCallback } from "react";
import { saveSurveyEntries } from '../_hook/save-survey-entry';
import { saveFortune } from '../_hook/save-fortune';
import { useUser } from '@/hooks/useUser';

function FortuneGenerator({ answers }: { answers: Partial<Record<QuestionKey, any>> }) {
  const [fortune, setFortune] = useState<string>("");
  const [haiku, setHaiku] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { name } = useFortunator();
  const { user } = useUser();

  const generateFortune = useCallback(async (
    name: string,
    answers: Partial<Record<QuestionKey, any>>,
    setFortune: React.Dispatch<React.SetStateAction<string>>,
    setHaiku: React.Dispatch<React.SetStateAction<string[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    shouldSaveToDb: boolean = false
  ) => {
    const defaultFortune = "Your coding journey will be filled with exciting discoveries and successful projects!";
    const defaultHaiku = [
      "Code flows like water",
      "Bugs vanish in morning light",
      "Success blooms ahead"
    ];

    try {
      setLoading(true);
      const response = await fetch('/api/fortunator/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, answers }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate fortune');
      }

      const data = await response.json();
      setFortune(data.fortune);
      setHaiku(data.haiku);

      // Only save to database if explicitly requested
      if (shouldSaveToDb && user) {
        const entries = Object.entries(answers).map(([questionId, value]) => ({
          questionId,
          answerId: value.toString(),
        }));
        await saveSurveyEntries(user.id, entries);
        await saveFortune(user.id, data.fortune, data.haiku);
      }

    } catch (error) {
      console.error("Error generating fortune:", error);
      setFortune(defaultFortune);
      setHaiku(defaultHaiku);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && !fortune) {
      generateFortune(name, answers, setFortune, setHaiku, setLoading, true);
    }
  }, [user, name, answers, generateFortune, fortune]);

  if (loading) {
    return <div className="p-6 bg-white rounded-lg shadow-sm border animate-pulse">Generating your fortune...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        {name ? `${name}'s` : 'Your'} Coding Fortune
      </h3>
      <button 
        onClick={() => generateFortune(name, answers, setFortune, setHaiku, setLoading, false)}
        className="mb-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
      >
        Generate New Fortune
      </button>
      <div className="flex justify-center mb-8">
        <div className="relative w-72">
          <div className="relative bg-white p-6 text-center border border-gray-300 shadow-md transform -rotate-1">
            {/* Wrinkled paper effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-50"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.02) 55%, transparent 55%),
                linear-gradient(-45deg, transparent 45%, rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.02) 55%, transparent 55%),
                linear-gradient(90deg, transparent 45%, rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.02) 55%, transparent 55%),
                linear-gradient(0deg, transparent 45%, rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.02) 55%, transparent 55%)
              `,
              backgroundSize: '20px 20px',
              opacity: 0.5
            }}></div>
            <div className="relative">
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gray-200"></div>
              <div className="absolute -right-2 top-0 bottom-0 w-1 bg-gray-200"></div>
              <p className="text-gray-800 font-medium leading-relaxed px-4">
                {fortune}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">In Haiku Form</h4>
        <div className="text-gray-600 italic text-center">
          <div className="space-y-2">
            {haiku.map((line, index) => (
              <p key={index} className="text-lg leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsQuestion() {
  const { answers } = useFortunator();

  const getAnswerLabel = useCallback((questionId: QuestionKey, value: any) => {
    if (!value) return '';
    const labels = ANSWER_LABELS[questionId as keyof typeof ANSWER_LABELS];
    return labels ? labels[value as keyof typeof labels] || value : value;
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Fortunator Results</h1>
      <div className="space-y-6">
        <FortuneGenerator answers={answers} />
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Preferences</h3>
          <div className="space-y-4">
            {Object.entries(answers).map(([questionId, value]) => {
              const question = QUESTIONS.find(q => q.id === questionId);
              return (
                <div key={questionId} className="border-b last:border-b-0 pb-4 last:pb-0">
                  <h4 className="text-md font-medium text-gray-900 mb-1">
                    {question?.prompt || questionId.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h4>
                  <p className="text-gray-600">
                    {getAnswerLabel(questionId as QuestionKey, value)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}