'use client';

import { useState } from 'react';
import { useFortunator } from '../layout';
import { useRouter } from 'next/navigation';

const languages = [
  'Rust',
  'JavaScript',
  'Python',
  'TypeScript',
  'Go',
  'Java',
  'C++',
  'Ruby',
  'PHP',
  'Swift',
];

export default function LanguageQuestion() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const { setAnswer, setCurrentQuestion } = useFortunator();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLanguage) {
      setAnswer('favorite_language', selectedLanguage);
      setCurrentQuestion(4);
      router.push('/landing/fortunator/question_5');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        What's your favorite language this month?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        >
          <option value="">Select a language</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          Continue
        </button>
      </form>
    </div>
  );
} 