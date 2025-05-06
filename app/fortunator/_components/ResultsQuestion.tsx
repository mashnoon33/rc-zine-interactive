'use client';

import { useFortunator, ANSWER_LABELS, QuestionKey, QUESTIONS } from '../layout';
import { useCallback } from "react";
import { FortuneGenerator } from './FortuneGenerator';

export default function ResultsQuestion() {
  const { answers } = useFortunator();

  const getAnswerLabel = useCallback((questionId: QuestionKey, value: any) => {
    if (!value) return '';
    const labels = ANSWER_LABELS[questionId as keyof typeof ANSWER_LABELS];
    return labels ? labels[value as keyof typeof labels] || value : value;
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Fortunator Results</h1>
      <div className="space-y-6">
        <FortuneGenerator answers={answers} />
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Preferences</h3>
          <div className="space-y-4">
            {Object.entries(answers).map(([questionId, value]) => {
              const question = QUESTIONS.find(q => q.id === questionId);
              return (
                <div key={questionId} className="border-b last:border-b-0 pb-4 last:pb-0">
                  <h4 className="text-md font-medium text-gray-900 mb-1">
                    {question?.prompt || questionId.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h4>
                  <p className="text-gray-600">
                    {getAnswerLabel(questionId as QuestionKey, value)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}