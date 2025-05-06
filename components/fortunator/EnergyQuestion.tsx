'use client';

import { QUESTIONS, useFortunator } from './context';
import { energyOptions } from './consts';
import { Card, CardTitle } from '../ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function Visualization({ data }: { data: string[] }) {
  // Count occurrences of each energy level and calculate total energy
  const energyLevels = data.reduce((acc, energy) => {
    const option = energyOptions.find(opt => opt.id === energy);
    if (option) {
      acc[energy] = (acc[energy] || 0) + option.value;
    }
    return acc;
  }, {} as Record<string, number>);

  // Calculate total energy across all responses
  const totalEnergy = Object.values(energyLevels).reduce((sum, count) => sum + count, 0);
  const averageEnergy = totalEnergy / data.length;
  const maxEnergy = 9; // Maximum possible energy value
  const energyPercentage = (averageEnergy / maxEnergy) * 100;

  // Prepare data for the donut chart
  const chartData = [
    { name: 'Energy', value: energyPercentage },
    { name: 'Remaining', value: 100 - energyPercentage }
  ];

  const COLORS = ['#8B5CF6', '#E5E7EB']; // Purple and gray

  // Count occurrences of each option
  const optionCounts = data.reduce((acc, energy) => {
    acc[energy] = (acc[energy] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <CardTitle className='flex justify-between'>
          <span className="">Average Energy Level</span>
          <span className="text-2xl font-bold text-purple-600">{energyPercentage.toFixed(1)}%</span>
        </CardTitle>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-sm text-gray-500 space-y-1">
          <div className="grid grid-cols-2 gap-2">
            {energyOptions.map(option => (
              <div key={option.id} className="flex justify-between">
                <span>{option.label}</span>
                <span>{optionCounts[option.id] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
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