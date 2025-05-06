'use client';

import { useFortunator, QUESTIONS } from '../../app/fortunator/layout';

export const options = [
  { id: 'python', label: '🐍 Python' },
  { id: 'rust', label: '🦀 Rust' },
  { id: 'go', label: '🚀 Go' },
  { id: 'typescript', label: '📘 TypeScript' },
];

export default function LanguageQuestion() {
  const { setAnswer, nextQuestion, currentQuestion } = useFortunator();
  const question = QUESTIONS[currentQuestion];

  const handleSelect = (languageId: string) => {
    setAnswer('favorite_language', languageId);
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
      <div className="grid grid-cols-3 gap-4">
        {options.map((language) => (
          <button
            key={language.id}
            onClick={() => handleSelect(language.id)}
            className="p-4 text-left border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
          >
            {language.label}
          </button>
        ))}
      </div>
    </div>
  );
} 