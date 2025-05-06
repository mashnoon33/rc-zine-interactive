'use client';

import { useFortunator } from '@/components/fortunator/context';
import NameInput from '../../components/fortunator/NameInput';

export default function FortunatorPage() {
    const { name } = useFortunator();

    if (!name) {
        return (
            <div className="space-y-8">
                <NameInput />
            </div>
        );
    }

    return null; // The layout will handle rendering the questions
}