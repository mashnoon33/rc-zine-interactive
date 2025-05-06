'use client';

import { useState, Fragment } from 'react';
import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex } from '@uiw/color-convert';
import { QUESTIONS, useFortunator } from './context';
import { Card, CardHeader } from '../ui/card';

export function Visualization({ data }: { data: string[] }) {
  return (
    <Card className="flex flex-wrap gap-4 p-4">
      {data.map((color, index) => (
        <div 
          key={index}
          className="w-16 h-16 rounded-lg border border-gray-200"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </Card>
  );
}

export default function ColorPickerQuestion() {
  const { setAnswer, nextQuestion, currentQuestion } = useFortunator();
  const question = QUESTIONS[currentQuestion];
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

  const handleColorChange = (color: any) => {
    setHsva({ ...hsva, ...color.hsva });
  };

  const handleSubmit = () => {
    setAnswer('mood_color', hsvaToHex(hsva));
    nextQuestion();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {question.prompt.split(question.highlight).map((part: string, i: number, arr: string[]) => (
          <Fragment key={i}>
            {part}
            {i < arr.length - 1 && <span className="text-purple-600">{question.highlight}</span>}
          </Fragment>
        ))}
      </h2>
      <div className="flex flex-col items-center space-y-4">
        <Wheel 
          color={hsva} 
          onChange={handleColorChange}
          width={300}
          height={300}
        />
        <div 
          className="w-full h-8 rounded-md border border-gray-200"
          style={{ background: hsvaToHex(hsva) }}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Select Color
        </button>
      </div>
    </div>
  );
}