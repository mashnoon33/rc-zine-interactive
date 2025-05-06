'use client';

import { useFortunator } from '../../app/fortunator/layout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NameInput() {
  const { setName } = useFortunator();
  const router = useRouter();
  const [inputName, setInputName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setName(inputName.trim());
      router.push('/landing/fortunator/question_1');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        What's your <span className="text-purple-600">name</span>?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={!inputName.trim()}
          className="w-full p-4 text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Continue
        </button>
      </form>
    </div>
  );
} 