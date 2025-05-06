// Question Keys
export const QUESTION_KEYS = {
  NAME: 'name',
  ENERGY: 'energy',
  TABS_SPACES: 'tabs_spaces',
  DEV_ENVIRONMENT: 'dev_environment',
  MOOD_COLOR: 'mood_color',
  FAVORITE_LANGUAGE: 'favorite_language',
  PAIRING: 'pairing',
  RAGE_QUIT: 'rage_quit',
  DEBUGGING_SOUNDTRACK: 'debugging_soundtrack',
  SPRING_EMOJI: 'spring_emoji',
  RESULTS: 'results',
} as const;

export type QuestionKey = typeof QUESTION_KEYS[keyof typeof QUESTION_KEYS];

// Answer Label Types
export type AnswerOption = {
  id: string;
  label: string;
};

export type AnswerOptions = {
  [K in QuestionKey]?: AnswerOption[];
};

// Context Types
export interface FortunatorContextType {
  answers: Partial<Record<QuestionKey, any>>;
  setAnswer: (questionId: QuestionKey, value: any) => void;
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
  nextQuestion: () => void;
  name: string;
  setName: (name: string) => void;
}

// Question Type
export type Question = {
  id: QuestionKey;
  component: React.ComponentType<any>;
  prompt: string;
  highlight: string;
}
