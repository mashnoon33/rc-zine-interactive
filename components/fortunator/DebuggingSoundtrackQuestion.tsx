'use client';

import { useFortunator } from '../../app/fortunator/layout';
import { debuggingSoundtrackOptions } from './consts';

export default function DebuggingSoundtrackQuestion() {
  const { setAnswer, nextQuestion } = useFortunator();

  const handleSelect = (optionId: string) => {
    setAnswer('debugging_soundtrack', optionId);
    nextQuestion();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Your debugging <span className="text-purple-600">soundtrack</span> is...
      </h2>
      <div className="space-y-4 text-black">
        {debuggingSoundtrackOptions.map((option) => (
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