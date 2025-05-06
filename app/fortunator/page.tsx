'use client';

import { useFortunator } from './layout';
import NameInput from './_components/NameInput';

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