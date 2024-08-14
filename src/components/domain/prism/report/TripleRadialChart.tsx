'use client';

import RadialChart from '@/components/common/chart/RadialChart';
import TagInput from '@/components/common/input/TagInput';
import { cn } from '@/lib/utils';
import { RADIAL_EVALUATIONS, type RadialEvaluationType } from '@/models/prism/prismModels';

export interface RadialChartData {
  radialChartData: Record<RadialEvaluationType, number>;
  keyword: string[];
  evaluation: string;
}

interface TripleRadialChartProps {
  data: RadialChartData;
  radialParentClassName?: string;
  forSaveImage?: boolean;
}

export default function TripleRadialChart({
  data,
  radialParentClassName,
  forSaveImage = false,
}: TripleRadialChartProps) {
  const gridTextData = [
    { id: 'keyword', label: '키워드', value: data.keyword },
    { id: 'evaluation', label: '팀원 평가 요약', value: data.evaluation },
  ];
  return (
    <div className={cn('flex min-h-[330px] max-w-[560px] flex-col justify-center gap-5')}>
      <div className={cn('flex-wrap flex-center', radialParentClassName)}>
        {RADIAL_EVALUATIONS.map((type) => (
          <RadialChart key={type} type={type} value={data.radialChartData[type]} />
        ))}
      </div>
      <div className="grid grid-cols-[100px_1fr] gap-x-2 gap-y-2">
        {gridTextData.map((item) => (
          <div key={item.id} className="contents">
            <div className="text-gray-400 flex mobile1">{item.label}</div>
            <div className="text-gray-800 flex items-center gap-1 display5">
              {!item.value || (Array.isArray(item.value) && item.value.length === 0)
                ? '-'
                : item.id === 'keyword' && Array.isArray(item.value)
                  ? item.value.map((value, index) => (
                      <TagInput key={index} value={value} isDisabled forSaveImage={forSaveImage} />
                    ))
                  : item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const defaultTripleRadialChartData: RadialChartData = {
  radialChartData: {
    LEADERSHIP: 70,
    RELIABILITY: 80,
    TEAMWORK: 60,
  },
  keyword: ['배려', '책임감', '도전정신'],
  evaluation:
    '문제점을 바로 파악하고 해결책을 생각하는 문제해결능력이 큰 장점인 사람입니다. 다만 진행상황에 대해 즉시 공유하는 팀워크 능력이 다소 부족하다.',
};
