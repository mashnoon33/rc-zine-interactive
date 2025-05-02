'use client';

import { useState } from 'react';
import { useFortunator } from '../layout';
import { useRouter } from 'next/navigation';

const options = [
  { id: 'tabs', label: 'Tabs' },
  { id: 'spaces', label: 'Spaces' },
  { id: 'dont_at_me', label: "Don't @ me" },
];

export default function TabsSpacesQuestion() {
  const [selected, setSelected] = useState('');
  const { setAnswer, setCurrentQuestion } = useFortunator();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) {
      setAnswer('tabs_spaces', selected);
      setCurrentQuestion(7);
      router.push('/landing/fortunator/question_8');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Tabs or spaces?
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