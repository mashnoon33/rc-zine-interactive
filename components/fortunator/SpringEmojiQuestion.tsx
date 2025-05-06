'use client';

import { useFortunator, QUESTIONS } from '../../app/fortunator/layout';

export const options = [
  { id: '🌸', label: '🌸 Cherry Blossoms' },
  { id: '🌱', label: '🌱 New Beginnings' },
  { id: '🌷', label: '🌷 Tulips' },
  { id: '🦋', label: '🦋 Butterflies' },
  // { id: '🐝', label: '🐝 Bees' },
  { id: '🌞', label: '🌞 Sunny Days' },
  { id: '🤧', label: '🤧 Allergy Szn' },
];

export default function SpringEmojiQuestion() {
  const { setAnswer, nextQuestion, currentQuestion } = useFortunator();
  const question = QUESTIONS[currentQuestion];

  const handleSelect = (optionId: string) => {
    setAnswer('spring_emoji', optionId);
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
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className="p-4 text-left border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
} 