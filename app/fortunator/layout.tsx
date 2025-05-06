'use client';

import { useUser } from '@/hooks/useUser';
import {
  FortunatorContextType,
  Question,
  QUESTION_KEYS,
  QuestionKey
} from '@/types';
import { createContext, ReactNode, useContext, useState } from 'react';
import ColorPickerQuestion from '../../components/fortunator/ColorPickerQuestion';
import DevEnvironmentQuestion from '../../components/fortunator/DevEnvironmentQuestion';
import EnergyQuestion from '../../components/fortunator/EnergyQuestion';
import LanguageQuestion from '../../components/fortunator/LanguageQuestion';
import PairingQuestion from '../../components/fortunator/PairingQuestion';
import ProgressBar from '../../components/fortunator/ProgressBar';
import RageQuitQuestion from '../../components/fortunator/RageQuitQuestion';
import ResultsQuestion from '../../components/fortunator/ResultsQuestion';
import SpringEmojiQuestion from '../../components/fortunator/SpringEmojiQuestion';

const FortunatorContext = createContext<FortunatorContextType | undefined>(undefined);

export function useFortunator() {
  const context = useContext(FortunatorContext);
  if (!context) {
    throw new Error('useFortunator must be used within a FortunatorProvider');
  }
  return context;
}

// Question Components
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

export default function FortunatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [answers, setAnswers] = useState<Partial<Record<QuestionKey, any>>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [name, setName] = useState("");
  const { user } = useUser();
  const setAnswer = (questionId: QuestionKey, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const CurrentQuestionComponent = QUESTIONS[currentQuestion]?.component;

  return (
    <FortunatorContext.Provider
      value={{
        answers,
        setAnswer,
        currentQuestion,
        setCurrentQuestion,
        nextQuestion,
        name,
        setName,
      }}
    >
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <ProgressBar />
            {CurrentQuestionComponent && <CurrentQuestionComponent />}
          </div>
        </div>
      </div>
    </FortunatorContext.Provider>
  );
} 