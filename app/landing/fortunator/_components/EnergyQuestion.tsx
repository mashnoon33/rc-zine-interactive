'use client';

import { useFortunator } from '../layout';
import { useRouter } from 'next/navigation';

const options = [
  { id: 'ferret', label: 'Ferret on espresso' },
  { id: 'duck', label: 'Duck on pond' },
  { id: 'ikea', label: 'IKEA furniture in progress' },
  { id: 'null', label: 'NullPointerException' },
];

export default function EnergyQuestion() {
  const { setAnswer, setCurrentQuestion } = useFortunator();
  const router = useRouter();

  const handleSelect = (optionId: string) => {
    setAnswer('energy', optionId);
    setCurrentQuestion(1);
    router.push('/landing/fortunator/question_2');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        How would you describe your <span className="text-purple-600">energy</span> this week?
      </h2>
      <div className="space-y-4 text-black">
        {options.map((option) => (
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