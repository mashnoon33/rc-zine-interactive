'use client';

import { useState } from 'react';
import { useFortunator } from '../layout';
import { useRouter } from 'next/navigation';

export default function RageQuitQuestion() {
  const [rageQuits, setRageQuits] = useState(0);
  const { setAnswer, setCurrentQuestion } = useFortunator();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnswer('rage_quits', rageQuits);
    setCurrentQuestion(5);
    router.push('/landing/fortunator/question_6');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        How many times have you rage-quit this week?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="10"
            value={rageQuits}
            onChange={(e) => setRageQuits(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>0</span>
            <span className="font-bold">{rageQuits}</span>
            <span>10</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          Continue
        </button>
      </form>
    </div>
  );
} 