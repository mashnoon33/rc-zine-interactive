'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import EnergyQuestion from './_components/EnergyQuestion';
import TabsSpacesQuestion from './_components/TabsSpacesQuestion';
import DevEnvironmentQuestion from './_components/DevEnvironmentQuestion';
import ColorPickerQuestion from './_components/ColorPickerQuestion';
import LanguageQuestion from './_components/LanguageQuestion';
import PairingQuestion from './_components/PairingQuestion';
import RageQuitQuestion from './_components/RageQuitQuestion';
import DebuggingSoundtrackQuestion from './_components/DebuggingSoundtrackQuestion';
import SpringEmojiQuestion from './_components/SpringEmojiQuestion';
import ResultsQuestion from './_components/ResultsQuestion';
import ProgressBar from './_components/ProgressBar';
import { useUser } from '@/hooks/useUser';
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

// Answer Types
export type EnergyAnswer = 'ferret' | 'duck' | 'ikea' | 'npe';
export type TabsSpacesAnswer = 'tabs' | 'spaces' | 'dont_at_me';
export type DevEnvironmentAnswer = 'garden' | 'bicycle' | 'haunted' | 'spreadsheet';
export type LanguageAnswer = 'rust' | 'javascript' | 'python' | 'typescript' | 'go' | 'java' | 'c++' | 'ruby' | 'php' | 'swift';
export type PairingAnswer = 'yes' | 'no' | 'sometimes';
export type RageQuitAnswer = 'slam' | 'walk' | 'tea' | 'never';
export type DebuggingSoundtrackAnswer = 'classical' | 'rock' | 'silence' | 'podcast';

// Answer Arrays
export const ENERGY_OPTIONS: EnergyAnswer[] = ['ferret', 'duck', 'ikea', 'npe'];
export const TABS_SPACES_OPTIONS: TabsSpacesAnswer[] = ['tabs', 'spaces', 'dont_at_me'];
export const DEV_ENVIRONMENT_OPTIONS: DevEnvironmentAnswer[] = ['garden', 'bicycle', 'haunted', 'spreadsheet'];
export const LANGUAGE_OPTIONS: LanguageAnswer[] = ['rust', 'javascript', 'python', 'typescript', 'go', 'java', 'c++', 'ruby', 'php', 'swift'];
export const PAIRING_OPTIONS: PairingAnswer[] = ['yes', 'no', 'sometimes'];
export const RAGE_QUIT_OPTIONS: RageQuitAnswer[] = ['slam', 'walk', 'tea', 'never'];
export const DEBUGGING_SOUNDTRACK_OPTIONS: DebuggingSoundtrackAnswer[] = ['classical', 'rock', 'silence', 'podcast'];

// Answer Labels
type AnswerLabels = {
  [QUESTION_KEYS.ENERGY]: {
    [K in EnergyAnswer]: string;
  };
  [QUESTION_KEYS.TABS_SPACES]: {
    [K in TabsSpacesAnswer]: string;
  };
  [QUESTION_KEYS.DEV_ENVIRONMENT]: {
    [K in DevEnvironmentAnswer]: string;
  };
  [QUESTION_KEYS.PAIRING]: {
    [K in PairingAnswer]: string;
  };
  [QUESTION_KEYS.RAGE_QUIT]: {
    [K in RageQuitAnswer]: string;
  };
  [QUESTION_KEYS.DEBUGGING_SOUNDTRACK]: {
    [K in DebuggingSoundtrackAnswer]: string;
  };
  [QUESTION_KEYS.SPRING_EMOJI]: {
    [K in string]: string;
  };
  [QUESTION_KEYS.FAVORITE_LANGUAGE]: {
    [K in LanguageAnswer]: string;
  };
};

export const ANSWER_LABELS: AnswerLabels = {
  [QUESTION_KEYS.ENERGY]: {
    ferret: '🦫 Ferret on espresso',
    duck: '🦆 Duck on pond',
    ikea: '🪑 IKEA furniture in progress',
    npe: '💥 NullPointerException',
  },
  [QUESTION_KEYS.TABS_SPACES]: {
    tabs: '↹ Tabs',
    spaces: '␣ Spaces',
    dont_at_me: "🤫 Don't @ me",
  },
  [QUESTION_KEYS.DEV_ENVIRONMENT]: {
    garden: '🌿 An overgrown garden',
    bicycle: '🚲 A well-oiled bicycle',
    haunted: '👻 A haunted house',
    spreadsheet: '📊 A spreadsheet with feelings',
  },
  [QUESTION_KEYS.PAIRING]: {
    yes: '🤝 Yes, I love it!',
    no: '🎧 No, I prefer to code alone',
    sometimes: '⚖️ Sometimes, depends on the task',
  },
  [QUESTION_KEYS.RAGE_QUIT]: {
    slam: '💥 Slam the laptop shut',
    walk: '🚶 Take a long walk',
    tea: '🫖 Make a cup of tea',
    never: '😌 I never rage quit',
  },
  [QUESTION_KEYS.DEBUGGING_SOUNDTRACK]: {
    classical: '🎻 Classical music',
    rock: '🎸 Rock music',
    silence: '🤫 Complete silence',
    podcast: '🎙️ A podcast',
  },
  [QUESTION_KEYS.SPRING_EMOJI]: {
    '🌸': '🌸 Cherry Blossoms',
    '🌱': '🌱 New Beginnings',
    '🌷': '🌷 Tulips',
    '🦋': '🦋 Butterflies',
    '🌞': '🌞 Sunny Days',
    '🤧': '🤧 Allergy Szn',
  },
  [QUESTION_KEYS.FAVORITE_LANGUAGE]: {
    rust: '🦀 Rust',
    javascript: '📜 JavaScript',
    python: '🐍 Python',
    typescript: '📘 TypeScript',
    go: '🚀 Go',
    java: '☕ Java',
    'c++': '⚡ C++',
    ruby: '💎 Ruby',
    php: '🐘 PHP',
    swift: '🦅 Swift',
  },
} as const;

interface FortunatorContextType {
  answers: Partial<Record<QuestionKey, any>>;
  setAnswer: (questionId: QuestionKey, value: any) => void;
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
  nextQuestion: () => void;
  name: string;
  setName: (name: string) => void;
}

const FortunatorContext = createContext<FortunatorContextType | undefined>(undefined);

export function useFortunator() {
  const context = useContext(FortunatorContext);
  if (!context) {
    throw new Error('useFortunator must be used within a FortunatorProvider');
  }
  return context;
}

export type Question = {
  id: QuestionKey;
  component: React.ComponentType<any>;
  prompt: string;
  highlight: string;
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