'use client';

import { useFortunator, QUESTIONS } from '../../app/fortunator/layout';
import { colorPickerOptions } from './consts';

export default function ColorPickerQuestion() {
  const { setAnswer, nextQuestion, currentQuestion } = useFortunator();
  const question = QUESTIONS[currentQuestion];

  const handleSelect = (colorId: string) => {
    setAnswer('mood_color', colorId);
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
      <div className="grid grid-cols-4 gap-4">
        {colorPickerOptions.map((color) => (
          <button
            key={color.id}
            onClick={() => handleSelect(color.id)}
            className="aspect-square rounded-lg border-2 border-gray-200 hover:border-purple-500 transition-all duration-200"
            style={{ backgroundColor: color.label }}
            title={color.id}
          />
        ))}
      </div>
    </div>
  );
} 