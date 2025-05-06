'use client';

import { useFortunator } from '../layout';

const TOTAL_QUESTIONS = 10; // Update this as we add more questions

export default function ProgressBar() {
  const { currentQuestion } = useFortunator();
  const progress = ((currentQuestion + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
      <div
        className="h-full bg-purple-600 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 