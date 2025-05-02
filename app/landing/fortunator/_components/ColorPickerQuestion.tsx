'use client';

import { useState } from 'react';
import { useFortunator } from '../layout';
import { useRouter } from 'next/navigation';

export default function ColorPickerQuestion() {
  const [color, setColor] = useState('#6366f1');
  const { setAnswer, setCurrentQuestion } = useFortunator();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnswer('mood_color', color);
    setCurrentQuestion(3);
    router.push('/landing/fortunator/question_4');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Mood color today:
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center items-center">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-16 rounded-lg cursor-pointer"
          />
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