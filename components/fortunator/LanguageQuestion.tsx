'use client';

import { QUESTIONS, useFortunator } from './context';
import { BarChartComponent } from '@/components/ui/bar-chart';
import { languageOptions } from './consts';

export function Visualization({ data }: { data: string[] }) {
  // Count occurrences of each programming language
  const counts = data.reduce((acc, lang) => {
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Format data for the bar chart
  const chartData = Object.entries(counts).map(([lang, count]) => ({
    lang,
    count
  }));

  const config = {
    count: {
      label: 'Responses',
      color: 'purple'
    }
  };

  return (
    <BarChartComponent
      data={chartData}
      config={config}
      title="Favorite Programming Languages"
      description="Distribution of preferred programming languages"
      dataKey="lang"
    />
  );
}

export default function LanguageQuestion() {
  const { setAnswer, nextQuestion, currentQuestion } = useFortunator();
  const question = QUESTIONS[currentQuestion];

  const handleSelect = (languageId: string) => {
    setAnswer('favorite_language', languageId);
    nextQuestion();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {question.prompt.split(question.highlight).map((part: string, i: number, arr: string[]) => (
          <>
            {part}
            {i < arr.length - 1 && <span className="text-purple-600">{question.highlight}</span>}
          </>
        ))}
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {languageOptions.map((language) => (
          <button
            key={language.id}
            onClick={() => handleSelect(language.id)}
            className="p-4 text-left border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
          >
            {language.label}
          </button>
        ))}
      </div>
    </div>
  );
} 