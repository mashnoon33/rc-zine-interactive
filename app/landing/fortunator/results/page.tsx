'use client';

import { useFortunator } from '../layout';
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { useEffect, useState } from "react";

type EnergyAnswer = 'ferret' | 'duck' | 'ikea' | 'null';
type TabsSpacesAnswer = 'tabs' | 'spaces' | 'dont_at_me';
type DevEnvironmentAnswer = 'garden' | 'bicycle' | 'haunted' | 'spreadsheet';

function FortuneGenerator({ answers }: { answers: Record<string, any> }) {
  const [fortune, setFortune] = useState<string>("");
  const [haiku, setHaiku] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generateFortune() {
      try {
        const prompt = `Based on these developer preferences:
          Energy Level: ${answers.energy}
          Code Style: ${answers.tabs_spaces}
          Development Environment: ${answers.dev_environment}
          First, generate a short, optimistic, and encouraging fortune about their coding future. Keep it under 2 sentences.
          Then, generate a haiku that captures the same sentiment and meaning as the fortune. The haiku should follow the traditional 5-7-5 syllable pattern.
          Format your response as:
          FORTUNE: [your fortune here]
          HAIKU:
          [first line]
          [second line]
          [third line]`;

        const { text } = await generateText({
          model: google("models/gemini-2.0-flash-exp"),
          prompt,
        });

        // Split the response into fortune and haiku
        const [fortunePart, haikuPart] = text.split('HAIKU:');
        const fortuneText = fortunePart.replace('FORTUNE:', '').trim();
        const haikuLines = haikuPart
          ?.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .slice(0, 3) || [];

        setFortune(fortuneText);
        setHaiku(haikuLines);
      } catch (error) {
        console.error("Error generating fortune:", error);
        setFortune("Your coding journey will be filled with exciting discoveries and successful projects!");
        setHaiku([
          "Code flows like water",
          "Bugs vanish in morning light",
          "Success blooms ahead"
        ]);
      } finally {
        setLoading(false);
      }
    }

    generateFortune();
  }, [answers]);

  if (loading) {
    return <div className="p-6 bg-white rounded-lg shadow-sm border animate-pulse">Generating your fortune...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Coding Fortune</h3>
      
      <div className="flex justify-center mb-8">
        <div className="relative w-72">
          <div className="relative bg-white p-6 text-center border border-gray-300 shadow-md transform -rotate-1">
            {/* Wrinkled paper effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-50"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.02) 55%, transparent 55%),
                linear-gradient(-45deg, transparent 45%, rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.02) 55%, transparent 55%),
                linear-gradient(90deg, transparent 45%, rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.02) 55%, transparent 55%),
                linear-gradient(0deg, transparent 45%, rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.02) 55%, transparent 55%)
              `,
              backgroundSize: '20px 20px',
              opacity: 0.5
            }}></div>
            <div className="relative">
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gray-200"></div>
              <div className="absolute -right-2 top-0 bottom-0 w-1 bg-gray-200"></div>
              <p className="text-gray-800 font-medium leading-relaxed px-4">
                {fortune}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">In Haiku Form</h4>
        <div className="text-gray-600 italic text-center">
          <div className="space-y-2">
            {haiku.map((line, index) => (
              <p key={index} className="text-lg leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const { answers } = useFortunator();

  const getAnswerLabel = (questionId: string, value: any) => {
    switch (questionId) {
      case 'energy':
        return {
          ferret: 'Ferret on espresso',
          duck: 'Duck on pond',
          ikea: 'IKEA furniture in progress',
          null: 'NullPointerException',
        }[value as EnergyAnswer] || value;
      case 'tabs_spaces':
        return {
          tabs: 'Tabs',
          spaces: 'Spaces',
          dont_at_me: "Don't @ me",
        }[value as TabsSpacesAnswer] || value;
      case 'dev_environment':
        return {
          garden: 'An overgrown garden',
          bicycle: 'A well-oiled bicycle',
          haunted: 'A haunted house',
          spreadsheet: 'A spreadsheet with feelings',
        }[value as DevEnvironmentAnswer] || value;
      default:
        return value;
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Fortunator Results</h1>
      <div className="space-y-6">
        <FortuneGenerator answers={answers} />
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Preferences</h3>
          <div className="space-y-4">
            {Object.entries(answers).map(([questionId, value]) => (
              <div key={questionId} className="border-b last:border-b-0 pb-4 last:pb-0">
                <h4 className="text-md font-medium text-gray-900 mb-1">
                  {questionId.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </h4>
                <p className="text-gray-600">
                  {getAnswerLabel(questionId, value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 