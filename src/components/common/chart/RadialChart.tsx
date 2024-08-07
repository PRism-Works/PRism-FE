'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Crown, HeartHandshake, Cog } from 'lucide-react';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import tailwindColors from 'tailwindcss/colors';
import { RADIAL_EVALUATION_LABELS, type RadialEvaluationType } from '@/models/prism/prismModels';

export const EVALUATION_INFO: Record<
  RadialEvaluationType,
  {
    label: string;
    icon: React.ElementType;
    color: string;
    darkColor?: string;
  }
> = {
  LEADERSHIP: {
    label: RADIAL_EVALUATION_LABELS.LEADERSHIP,
    icon: Crown,
    color: tailwindColors.purple[900],
    darkColor: tailwindColors.purple[400],
  },
  RELIABILITY: {
    label: RADIAL_EVALUATION_LABELS.RELIABILITY,
    icon: HeartHandshake,
    color: tailwindColors.purple[800],
    darkColor: tailwindColors.purple[300],
  },
  TEAMWORK: {
    label: RADIAL_EVALUATION_LABELS.TEAMWORK,
    icon: Cog,
    color: tailwindColors.purple[900],
    darkColor: tailwindColors.purple[400],
  },
};

interface RadialChartProps {
  type: RadialEvaluationType;
  value: number;
}

// RadialChart 컴포넌트
export default function RadialChart({ type, value }: RadialChartProps) {
  const { theme } = useTheme();
  const { label, icon: Icon, color, darkColor } = EVALUATION_INFO[type];

  const fillColor = theme === 'dark' && darkColor ? darkColor : color; // 다크 모드일 때 색상 변경

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
        <RadialBar background dataKey="value" cornerRadius={50} fill={fillColor} />
      </RadialBarChart>
      <div className="absolute inset-0 flex-col-center">
        <Icon className="h-5 w-5" />
        {/* figma 기준 mobile2, body2인데, line-height 속성으로 인해 디자인처럼 나올 수 없고 디자인과 너무 상이하여 직접 정의했습니다. */}
        <span
          className={`text-[12px] font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-400'
          }`}>
          {label}
        </span>
        <span
          className={`text-[23px] font-semibold leading-[1] ${
            theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
          }`}>
          {value}%
        </span>
      </div>
    </div>
  );
}
