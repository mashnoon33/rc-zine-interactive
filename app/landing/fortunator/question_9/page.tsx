'use client';

import DevEnvironmentQuestion from '../_components/DevEnvironmentQuestion';
import ProgressBar from '../_components/ProgressBar';

export default function Question9Page() {
  return (
    <div className="space-y-8">
      <ProgressBar />
      <DevEnvironmentQuestion />
    </div>
  );
} 