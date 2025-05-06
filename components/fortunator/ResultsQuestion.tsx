'use client';

// React imports
import { useCallback } from "react";

// App imports
import { QUESTIONS, useFortunator } from './context';
import { QuestionKey, QUESTION_KEYS } from '@/types';
import { FortuneGenerator } from './FortuneGenerator';

// Question options
import {
  energyOptions,
  tabsSpacesOptions,
  devEnvironmentOptions,
  colorPickerOptions,
  languageOptions,
  pairingOptions,
  rageQuitOptions,
  springEmojiOptions,
  debuggingSoundtrackOptions
} from './consts';

// Map of question IDs to their options
const QUESTION_OPTIONS: Partial<Record<QuestionKey, typeof energyOptions>> = {
  [QUESTION_KEYS.ENERGY]: energyOptions,
  [QUESTION_KEYS.TABS_SPACES]: tabsSpacesOptions,
  [QUESTION_KEYS.DEV_ENVIRONMENT]: devEnvironmentOptions,
  [QUESTION_KEYS.MOOD_COLOR]: colorPickerOptions,
  [QUESTION_KEYS.FAVORITE_LANGUAGE]: languageOptions,
  [QUESTION_KEYS.PAIRING]: pairingOptions,
  [QUESTION_KEYS.RAGE_QUIT]: rageQuitOptions,
  [QUESTION_KEYS.SPRING_EMOJI]: springEmojiOptions,
  [QUESTION_KEYS.DEBUGGING_SOUNDTRACK]: debuggingSoundtrackOptions,
} as const;

export default function ResultsQuestion() {
  const { answers } = useFortunator();

  const getAnswerLabel = useCallback((questionId: QuestionKey, value: any) => {
    if (!value) return '';
    
    const options = QUESTION_OPTIONS[questionId];
    if (!options) return value;

    const option = options.find(opt => opt.id === value);
    return option?.label || value;
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