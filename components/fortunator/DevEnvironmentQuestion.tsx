'use client';

import { useFortunator, QUESTIONS } from '../../app/fortunator/layout';
import { BarChartComponent } from '@/components/ui/bar-chart';
import { devEnvironmentOptions } from './consts';

export function Visualization({ data }: { data: string[] }) {
  // Count occurrences of each environment type
  const counts = data.reduce((acc, env) => {
    acc[env] = (acc[env] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Format data for the bar chart
  const chartData = Object.entries(counts).map(([env, count]) => ({
    env,
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
      title="Development Environment Metaphors"
      description="How developers view their coding environment"
      dataKey="env"
    />
  );
}

export default function DevEnvironmentQuestion() {
  const { setAnswer, nextQuestion, currentQuestion } = useFortunator();
  const question = QUESTIONS[currentQuestion];

  const handleSelect = (optionId: string) => {
    setAnswer('dev_environment', optionId);
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
      <div className="space-y-4 text-black">
        {devEnvironmentOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className="w-full p-4 text-left border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
} 