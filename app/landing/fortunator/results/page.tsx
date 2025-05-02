'use client';

import { useFortunator } from '../layout';

type EnergyAnswer = 'ferret' | 'duck' | 'ikea' | 'null';
type TabsSpacesAnswer = 'tabs' | 'spaces' | 'dont_at_me';
type DevEnvironmentAnswer = 'garden' | 'bicycle' | 'haunted' | 'spreadsheet';

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
        {Object.entries(answers).map(([questionId, value]) => (
          <div key={questionId} className="p-6 bg-white rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {questionId.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h3>
            <p className="text-gray-600">
              {getAnswerLabel(questionId, value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 