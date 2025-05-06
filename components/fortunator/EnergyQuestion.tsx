'use client';

import { useFortunator, QUESTIONS } from '../../app/fortunator/layout';
import { BarChartComponent } from '@/components/ui/bar-chart';
import { energyOptions } from './consts';

export function Visualization({ data }: { data: string[] }) {
  // Count occurrences of each energy level
  const counts = data.reduce((acc, energy) => {
    acc[energy] = (acc[energy] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Format data for the bar chart
  const chartData = Object.entries(counts).map(([energy, count]) => ({
    energy,
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
      title="Energy Level Distribution"
      description="How developers describe their energy levels"
      dataKey="energy"
    />
  );
}

export default function EnergyQuestion() {
  const { setAnswer, nextQuestion, currentQuestion } = useFortunator();
  const question = QUESTIONS[currentQuestion];

  const handleSelect = (optionId: string) => {
    setAnswer('energy', optionId);
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
        {energyOptions.map((option) => (
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