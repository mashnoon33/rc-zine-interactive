'use client';

import { useFortunator } from '../../app/fortunator/layout';

export const options = [
  { id: 'tabs', label: '↹ Tabs' },
  { id: 'spaces', label: '␣ Spaces' },
  { id: 'dont_at_me', label: "🤫 Don't @ me" },
];

export default function TabsSpacesQuestion() {
  const { setAnswer, setCurrentQuestion } = useFortunator();

  const handleSelect = (optionId: string) => {
    setAnswer('tabs_spaces', optionId);
    setCurrentQuestion(2);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Tabs or <span className="text-purple-600">spaces</span>?
      </h2>
      <div className="space-y-4 text-black">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className="w-full p-4 text-left border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
} 