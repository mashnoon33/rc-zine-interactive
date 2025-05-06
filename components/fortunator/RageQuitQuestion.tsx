'use client';

import { useFortunator, QUESTIONS } from '../../app/fortunator/layout';

export const options = [
  { id: 'slam', label: '💥 Slam the laptop shut' },
  { id: 'walk', label: '🚶 Take a long walk' },
  { id: 'tea', label: '🫖 Make a cup of tea' },
  { id: 'never', label: '😌 I never rage quit' },
];

export default function RageQuitQuestion() {
  const { setAnswer, nextQuestion, currentQuestion } = useFortunator();
  const question = QUESTIONS[currentQuestion];

  const handleSelect = (optionId: string) => {
    setAnswer('rage_quit', optionId);
    nextQuestion();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {question.prompt.split(question.highlight).map((part: string, i: number, arr: string[]) => (
          <>
            {part}
            {i < arr.length - 1 && <span className="text-purple-600">{question.highlight}</span>}
          </>
        ))}
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