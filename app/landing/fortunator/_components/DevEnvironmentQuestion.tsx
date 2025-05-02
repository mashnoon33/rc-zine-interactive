'use client';

import { useState } from 'react';
import { useFortunator } from '../layout';
import { useRouter } from 'next/navigation';

const options = [
  { id: 'garden', label: 'An overgrown garden' },
  { id: 'bicycle', label: 'A well-oiled bicycle' },
  { id: 'haunted', label: 'A haunted house' },
  { id: 'spreadsheet', label: 'A spreadsheet with feelings' },
];

export default function DevEnvironmentQuestion() {
  const [selected, setSelected] = useState('');
  const { setAnswer, setCurrentQuestion } = useFortunator();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) {
      setAnswer('dev_environment', selected);
      setCurrentQuestion(9);
      router.push('/landing/fortunator/results');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        "My dev environment feels like..."
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelected(option.id)}
            className={`w-full p-4 text-left border rounded-lg transition-all duration-200 ${
              selected === option.id
                ? 'border-purple-500 bg-purple-50'
                : 'hover:border-purple-500 hover:bg-purple-50'
            }`}
          >
            {option.label}
          </button>
        ))}
        <button
          type="submit"
          disabled={!selected}
          className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </form>
    </div>
  );
} 