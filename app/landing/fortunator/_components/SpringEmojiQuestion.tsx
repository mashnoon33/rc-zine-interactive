'use client';

import { useState } from 'react';
import { useFortunator } from '../layout';
import { useRouter } from 'next/navigation';

export default function SpringEmojiQuestion() {
  const [emoji, setEmoji] = useState('');
  const { setAnswer, setCurrentQuestion } = useFortunator();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emoji.trim()) {
      setAnswer('spring_emoji', emoji);
      setCurrentQuestion(8);
      router.push('/landing/fortunator/question_9');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Describe spring using one emoji:
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          placeholder="Enter an emoji..."
          className="w-full p-4 text-2xl border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          maxLength={2}
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