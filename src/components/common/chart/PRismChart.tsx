'use client';

import { useId } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

import tailwindColors from 'tailwindcss/colors';

// EvaluationType, Evaluation는 나중에 공통 타입 정의 파일로 옮겨야 하는 interface 입니다.
type EvaluationType = '의사소통능력' | '적극성' | '문제해결능력' | '책임감' | '협동심';

// export는 다른 컴포넌트에서 데이터 타입을 명시적으로 선언해야해서 임시로 추가했습니다! -> 파일 옮기면서 삭제 예정
export interface Evaluation {
  evaluation: EvaluationType;
  percent: number;
  fullMark: number;
}

interface PRismChartComponentProps {
  data: Evaluation[];
  hideAxis?: boolean;
  fontSize?: number;
  startColor?: string;
  endColor?: string;
}

export default function PRismChart({
  data,
  hideAxis = false,
  fontSize = 14,
  startColor = tailwindColors.indigo[300],
  endColor = tailwindColors.purple[700],
}: PRismChartComponentProps) {
  const id = useId();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
        <PolarGrid strokeDasharray="3 3" />
        {!hideAxis && <PolarAngleAxis dataKey="evaluation" tick={{ fontSize }} />}
        <PolarRadiusAxis domain={[0, 100]} axisLine={false} tick={false} />
        <Radar
          name="Mike"
          dataKey="percent"
          stroke="transparent"
          fill={`url(#${id})`}
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
