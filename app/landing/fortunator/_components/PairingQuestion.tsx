'use client';

import { useState } from 'react';
import { useFortunator } from '../layout';
import { useRouter } from 'next/navigation';

export default function PairingQuestion() {
  const [pairingSessions, setPairingSessions] = useState(0);
  const { setAnswer, setCurrentQuestion } = useFortunator();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnswer('pairing_sessions', pairingSessions);
    setCurrentQuestion(6);
    router.push('/landing/fortunator/question_7');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        How many times have you paired this week?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="10"
            value={pairingSessions}
            onChange={(e) => setPairingSessions(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>0</span>
            <span className="font-bold">{pairingSessions}</span>
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