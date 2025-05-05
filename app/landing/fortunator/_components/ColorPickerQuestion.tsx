'use client';

import { useFortunator, QUESTIONS } from '../layout';

const colors = [
  { id: 'red', hex: '#FF0000' },
  { id: 'orange', hex: '#FFA500' },
  { id: 'yellow', hex: '#FFFF00' },
  { id: 'green', hex: '#00FF00' },
  { id: 'blue', hex: '#0000FF' },
  { id: 'purple', hex: '#800080' },
  { id: 'pink', hex: '#FFC0CB' },
  { id: 'brown', hex: '#A52A2A' },
  { id: 'black', hex: '#000000' },
  { id: 'white', hex: '#FFFFFF' },
  { id: 'gray', hex: '#808080' },
  { id: 'teal', hex: '#008080' },
];

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
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => handleSelect(color.id)}
            className="aspect-square rounded-lg border-2 border-gray-200 hover:border-purple-500 transition-all duration-200"
            style={{ backgroundColor: color.hex }}
            title={color.id}
          />
        ))}
      </div>
    </div>
  );
} 