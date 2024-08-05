'use client';

import { ICONS } from '@/components/common/chart/PRismChart';
import {
  PRISM_EVALUATION_LABELS,
  PRISM_EVALUATIONS,
  PRismEvaluationType,
} from '@/models/prism/prismModels';

export default function ChartIndicators() {
  return (
    <div className="flex justify-center space-x-4 py-10 sm:space-x-12 md:space-x-16 lg:space-x-24">
      {PRISM_EVALUATIONS.map((type: PRismEvaluationType) => {
        const Icon = ICONS[type];
        const label = PRISM_EVALUATION_LABELS[type];

        return (
          <div key={type} className="flex flex-col items-center justify-center">
            <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            <span className="mt-2 text-sm text-white">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
