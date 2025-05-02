'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFortunator } from './layout';

export default function FortunatorPage() {
    const router = useRouter();
    const { setCurrentQuestion } = useFortunator();

    useEffect(() => {
        setCurrentQuestion(0);
        router.push('/landing/fortunator/question_1');
    }, [router, setCurrentQuestion]);

    return null;
}