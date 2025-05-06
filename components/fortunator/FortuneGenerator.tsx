'use client';
import { useUser } from '@/hooks/useUser';
import { useState, useCallback, useEffect } from 'react';
import { saveFortune } from '../../app/fortunator/_hook/save-fortune';
import { saveSurveyEntries } from '../../app/fortunator/_hook/save-survey-entry';
import {  useFortunator } from '../../app/fortunator/layout';
import { QuestionKey } from '@/types';

const DEFAULT_FORTUNE = "Your coding journey will be filled with exciting discoveries and successful projects!";
const DEFAULT_HAIKU = [
  "Code flows like water",
  "Bugs vanish in morning light",
  "Success blooms ahead"
];

const generateFortuneFromAPI = async (name: string, answers: Partial<Record<QuestionKey, any>>) => {
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

  return response.json();
};

const saveToDatabase = async (userId: string, answers: Partial<Record<QuestionKey, any>>, fortune: string, haiku: string[]) => {
  const entries = Object.entries(answers).map(([questionId, value]) => ({
    questionId,
    answerId: value.toString(),
  }));
  await saveSurveyEntries(userId, entries);
  await saveFortune(userId, fortune, haiku);
};

export function FortuneGenerator({ answers }: { answers: Partial<Record<QuestionKey, any>>; }) {
  const [fortune, setFortune] = useState<string>("");
  const [haiku, setHaiku] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const { name } = useFortunator();
  const { user } = useUser();

  const generateFortune = useCallback(async () => {
    try {
      setLoading(true);
      const data = await generateFortuneFromAPI(name, answers);
      setFortune(data.fortune);
      setHaiku(data.haiku);
 
    } catch (error) {
      console.error("Error generating fortune:", error);
      setFortune(DEFAULT_FORTUNE);
      setHaiku(DEFAULT_HAIKU);
    } finally {
      setLoading(false);
    }
  }, [user, name, answers]);

  useEffect(() => {
    if (user && !fortune) {
      generateFortune();
    }
  }, [user, fortune, generateFortune]);

  useEffect(() => {
    if (user && fortune && haiku && !submitted) {
      saveToDatabase(user.id, answers, fortune, haiku);
      setSubmitted(true);
    }
  }, [user, answers, fortune, haiku, submitted]);

  if (loading) {
    return <div className="p-6 bg-white rounded-lg shadow-sm border animate-pulse">Generating your fortune...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        {name ? `${name}'s` : 'Your'} Coding Fortune
      </h3>
 
      <div className="flex justify-center mb-8">
        <div className="relative w-72">
          <div className="relative bg-white p-6 text-center border border-gray-300 shadow-md transform -rotate-1">
            {/* Wrinkled paper effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-50"></div>
            <div className="absolute inset-0"></div>
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
