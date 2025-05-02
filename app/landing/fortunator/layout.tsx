'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FortunatorContextType {
  answers: Record<string, any>;
  setAnswer: (questionId: string, value: any) => void;
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
}

const FortunatorContext = createContext<FortunatorContextType | undefined>(undefined);

export function useFortunator() {
  const context = useContext(FortunatorContext);
  if (!context) {
    throw new Error('useFortunator must be used within a FortunatorProvider');
  }
  return context;
}

export default function FortunatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const setAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <FortunatorContext.Provider
      value={{
        answers,
        setAnswer,
        currentQuestion,
        setCurrentQuestion,
      }}
    >
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    </FortunatorContext.Provider>
  );
} 