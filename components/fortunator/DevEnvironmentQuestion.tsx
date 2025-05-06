'use client';

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";
import { devEnvironmentOptions } from './consts';
import { QUESTIONS, useFortunator } from './context';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function Visualization({ data }: { data: string[] }) {
  // Count occurrences of each environment type
  const counts = data.reduce((acc, env) => {
    acc[env] = (acc[env] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Format data for the bar chart, including options with 0 votes
  const chartData = devEnvironmentOptions.map((option, index) => ({
    environment: option.label,
    responses: counts[option.id] || 0,
    fill: `hsl(var(--chart-${index + 1}))`
  }));

  const chartConfig = {
    responses: {
      label: "Responses",
    },
    ...Object.fromEntries(
      devEnvironmentOptions.map((option, index) => [
        option.id,
        {
          label: option.label,
          color: `hsl(var(--chart-${index + 1}))`,
        }
      ])
    )
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>State of RC dev environments</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="environment"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              fontSize={12}
              tickFormatter={(value)=> value.split(" ")[0]}

            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar 
              dataKey="responses" 
              fill="hsl(var(--chart-1))" 
              radius={8}
              fillOpacity={0.8}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {devEnvironmentOptions.map((option, index) => (
            <div key={option.id} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: `hsl(var(--chart-${index + 1}))` }}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
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