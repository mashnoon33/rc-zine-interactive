'use client';

import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { languageOptions } from './consts';
import { QUESTIONS, useFortunator } from './context';

export function Visualization({ data }: { data: string[] }) {
  // Count occurrences of each programming language
  const counts = data.reduce((acc, lang) => {
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Format data for the pie chart
  const chartData = Object.entries(counts).map(([lang, count]) => ({
    language: lang,
    count,
    fill: `hsl(var(--chart-${Object.keys(counts).indexOf(lang) + 1}))`
  }));

  const chartConfig = {
    count: {
      label: "Responses",
    },
    ...Object.fromEntries(
      Object.keys(counts).map((lang, index) => [
        lang,
        {
          label: languageOptions.find(opt => opt.id === lang)?.label || lang,
          color: `hsl(var(--chart-${index + 1}))`,
        }
      ])
    )
  } satisfies ChartConfig;

  return (
    <Card className=" h-full flex flex-col">
      <CardHeader className=" pb-0">
        <CardTitle>Votes on which language must go</CardTitle>
      </CardHeader>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
        <ChartContainer
          config={chartConfig}
          className="m-auto pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >

          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="language"
              label={({ name, percent }) => {
                const langLabel = languageOptions.find(opt => opt.id === name)?.label || name;
                return `${langLabel} (${(percent * 100).toFixed(0)}%)`;
              }}
              labelLine={{ stroke: 'currentColor', strokeWidth: 1 }}
              outerRadius={80}
            />
          </PieChart>
          </ChartContainer>
        </ResponsiveContainer>

      </div>

    </Card>
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
    <div className="space-y-6 ">
      <h2 className="text-2xl font-bold text-gray-900">
        {question.prompt.split(question.highlight).map((part: string, i: number, arr: string[]) => (
          <>
            {part}
            {i < arr.length - 1 && <span className="text-purple-600">{question.highlight}</span>}
          </>
        ))}
      </h2>
      <div className="flex flex-col gap-4">
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