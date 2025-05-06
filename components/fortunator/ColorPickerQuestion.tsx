'use client';

import { useState, Fragment } from 'react';
import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex } from '@uiw/color-convert';
import { QUESTIONS, useFortunator } from './context';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function Visualization({ data }: { data: string[] }) {
  // Convert hex colors to RGB and calculate average
  const averageColor = data.reduce((acc, hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return {
      r: acc.r + r / data.length,
      g: acc.g + g / data.length,
      b: acc.b + b / data.length
    };
  }, { r: 0, g: 0, b: 0 });

  // Convert average RGB back to hex
  const averageHex = `#${Math.round(averageColor.r).toString(16).padStart(2, '0')}${Math.round(averageColor.g).toString(16).padStart(2, '0')}${Math.round(averageColor.b).toString(16).padStart(2, '0')}`;

  // Calculate relative luminance to determine text color
  const luminance = (0.299 * averageColor.r + 0.587 * averageColor.g + 0.114 * averageColor.b) / 255;
  const textColor = luminance > 0.5 ? 'text-black' : 'text-white';

  return (
    <Card className="flex flex-wrap gap-4 p-4 h-full relative" style={{ backgroundColor: averageHex }}>
      <CardTitle className={textColor}>Average mood</CardTitle>
      <CardContent className='flex flex-col items-center justify-center'>
        <h1 className={`text-4xl font-bold ${textColor} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
          {averageHex}
        </h1>
      </CardContent>
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