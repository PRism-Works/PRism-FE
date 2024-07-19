'use client';

import React, { useEffect, useState } from 'react';
import { Crown, HeartHandshake, Gem } from 'lucide-react';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import tailwindColors from 'tailwindcss/colors';

// 평가 유형 상수 및 관련 정보 정의
export const EVALUATION_TYPES = {
  LEADERSHIP: 'LEADERSHIP',
  RELIABILITY: 'RELIABILITY',
  CHARISMA: 'CHARISMA',
} as const;

export type EvaluationType = (typeof EVALUATION_TYPES)[keyof typeof EVALUATION_TYPES];

// tailwindColor를 import하면 hydration 오류나서 테일윈드 컬러 팔레트 접근 안하고 색 직접 정의
export const EVALUATION_INFO: Record<
  EvaluationType,
  {
    label: string;
    icon: React.ElementType;
    color: string;
  }
> = {
  [EVALUATION_TYPES.LEADERSHIP]: {
    label: '리더십',
    icon: Crown,
    color: tailwindColors.purple[900],
  },
  [EVALUATION_TYPES.RELIABILITY]: {
    label: '신뢰도',
    icon: HeartHandshake,
    color: tailwindColors.purple[800],
  },
  [EVALUATION_TYPES.CHARISMA]: {
    label: '매력도',
    icon: Gem,
    color: tailwindColors.purple[900],
  },
};

interface RadialChartProps {
  type: EvaluationType;
  value: number;
}

// RadialChart 컴포넌트
export default function RadialChart({ type, value }: RadialChartProps) {
  const { label, icon: Icon, color } = EVALUATION_INFO[type];

  // 차트 로드 시, hydration 오류로 마운트 되었을 때만 렌더링 되도록 처리
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className="relative h-[160px] w-[160px]">
      <RadialBarChart
        width={160}
        height={160}
        innerRadius="72%"
        outerRadius="100%"
        data={[{ value }]}
        startAngle={90}
        endAngle={-270}>
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar background dataKey="value" cornerRadius={50} fill={color} />
      </RadialBarChart>
      <div className="absolute inset-0 flex-col-center">
        <Icon className="h-5 w-5" />
        {/* figma 기준 mobile2, body2인데, line-height 속성으로 인해 디자인처럼 나올 수 없고 디자인과 너무 상이하여 직접 정의했습니다. */}
        <span className="text-[12px] font-medium text-gray-400">{label}</span>

        <span className="text-[23px] font-semibold leading-[1] text-indigo-600">{value}%</span>
      </div>
    </div>
  );
}
