'use client';

import { useUser } from '@/hooks/useUser';
import {
  QuestionKey
} from '@/types';
import { ReactNode, useState } from 'react';
import ProgressBar from '../../components/fortunator/ProgressBar';
import { FortunatorContext, QUESTIONS } from '../../components/fortunator/context';

// Question Components
  

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