'use client';

import { useState } from 'react';
import { useFortunator } from '../layout';
import { useRouter } from 'next/navigation';

export default function DebuggingSoundtrackQuestion() {
  const [soundtrack, setSoundtrack] = useState('');
  const { setAnswer, setCurrentQuestion } = useFortunator();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (soundtrack.trim()) {
      setAnswer('debugging_soundtrack', soundtrack);
      setCurrentQuestion(2);
      router.push('/landing/fortunator/question_3');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        What's your debugging soundtrack?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={soundtrack}
          onChange={(e) => setSoundtrack(e.target.value)}
          placeholder="Enter your debugging soundtrack..."
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        />
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