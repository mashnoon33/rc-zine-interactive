'use client';

import EnergyQuestion from '../_components/EnergyQuestion';
import ProgressBar from '../_components/ProgressBar';

export default function Question1Page() {
    return (
        <div className="space-y-8">
            <ProgressBar />
            <EnergyQuestion />
        </div>
    );
}