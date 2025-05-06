'use client';

import { useFortunator, QUESTIONS } from '../../app/fortunator/layout';
import { BarChartComponent } from '@/components/ui/bar-chart';
import { springEmojiOptions } from './consts';

export function Visualization({ data }: { data: string[] }) {
  // Count occurrences of each emoji
  const counts = data.reduce((acc, emoji) => {
    acc[emoji] = (acc[emoji] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Format data for the bar chart
  const chartData = Object.entries(counts).map(([emoji, count]) => ({
    emoji,
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
      title="Spring Emoji Responses"
      description="Distribution of spring emoji selections"
      dataKey="emoji"
    />
  );
}

export default function SpringEmojiQuestion() {
  const { setAnswer, nextQuestion, currentQuestion } = useFortunator();
  const question = QUESTIONS[currentQuestion];

  const handleSelect = (optionId: string) => {
    setAnswer('spring_emoji', optionId);
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
      <div className="grid grid-cols-2 gap-4">
        {springEmojiOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className="p-4 text-left border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
} 