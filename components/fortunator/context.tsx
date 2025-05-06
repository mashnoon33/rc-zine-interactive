'use client';

import { FortunatorContextType, Question, QUESTION_KEYS, QuestionKey } from '@/types';
import { createContext, ReactNode, useContext } from 'react';
import ColorPickerQuestion from './ColorPickerQuestion';
import DevEnvironmentQuestion from './DevEnvironmentQuestion';
import EnergyQuestion from './EnergyQuestion';
import LanguageQuestion from './LanguageQuestion';
import PairingQuestion from './PairingQuestion';
import RageQuitQuestion from './RageQuitQuestion';
import ResultsQuestion from './ResultsQuestion';
import SpringEmojiQuestion from './SpringEmojiQuestion';

const FortunatorContext = createContext<FortunatorContextType | undefined>(undefined);

export function useFortunator() {
  const context = useContext(FortunatorContext);
  if (!context) {
    throw new Error('useFortunator must be used within a FortunatorProvider');
  }
  return context;
}

export { FortunatorContext };


export const QUESTIONS: Question[] = [
    {
      id: QUESTION_KEYS.ENERGY,
      component: EnergyQuestion,
      prompt: "How would you describe your energy this week?",
      highlight: "energy",
    },
    {
      id: QUESTION_KEYS.DEV_ENVIRONMENT,
      component: DevEnvironmentQuestion,
      prompt: "Your dev environment is like ...",
      highlight: "dev environment",
    },
    {
      id: QUESTION_KEYS.MOOD_COLOR,
      component: ColorPickerQuestion,
      prompt: "Pick a color that matches your mood",
      highlight: "color",
    },
    {
      id: QUESTION_KEYS.FAVORITE_LANGUAGE,
      component: LanguageQuestion,
      prompt: "One of these must go...",
      highlight: "must go",
    },
    {
      id: QUESTION_KEYS.PAIRING,
      component: PairingQuestion,
      prompt: "Do you enjoy pair programming?",
      highlight: "pair programming",
    },
    {
      id: QUESTION_KEYS.RAGE_QUIT,
      component: RageQuitQuestion,
      prompt: "How do you rage quit?",
      highlight: "rage quit",
    },
    {
      id: QUESTION_KEYS.SPRING_EMOJI,
      component: SpringEmojiQuestion,
      prompt: "What emoji best describes your feelings about spring?",
      highlight: "spring",
    },
    {
      id: QUESTION_KEYS.RESULTS,
      component: ResultsQuestion,
      prompt: "Your Fortunator Results",
      highlight: "",
    },
  ] as const;