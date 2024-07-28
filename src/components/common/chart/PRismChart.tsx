'use client';

import { useId } from 'react';
import { Flag, Puzzle, Users, Wand2, Wrench } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import tailwindColors from 'tailwindcss/colors';
import {
  PRISM_EVALUATION_LABELS,
  PRISM_EVALUATIONS,
  type PRismEvaluation,
  type PRismEvaluationType,
} from '@/models/prism/prismModels';

interface PRismChartComponentProps {
  data: PRismEvaluation[];
  userName?: string; // 지표에 표시될 사용자 이름
  hideAxis?: boolean;
  fontSize?: number;
  startColor?: string;
  endColor?: string;
}

export default function PRismChart({
  data,
  userName = '', // 평가 지표의 대상 이름, 툴팁에 표시될 때 사용
  hideAxis = false,
  fontSize = 14,
  startColor = tailwindColors.purple[500],
  endColor = tailwindColors.indigo[500],
}: PRismChartComponentProps) {
  const id = useId();

  // Shadcn의 ChartTooltip을 쓰려면 ChartContainer 으로 감싸야함
  // ChartContainer는 chartConfig를 필수값으로 가지는데, 이미 이전에 직접 ReChart에 데이터를 정의해서 이 정의는 불필요함
  // 구색만 맞추려고 추가했으며, 추후에 Shadcn에서 제공해주는 차트로 컨버전할 예정 (그러나 gradient 색 지정 불가하면 유지할 에정)
  const chartConfig = {
    desktop: {
      label: 'evaluation',
    },
  };
  return (
    <ChartContainer className="h-full w-full" config={chartConfig}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
        <PolarGrid strokeLinecap="square" strokeOpacity={0.6} />
        {!hideAxis && (
          <PolarAngleAxis dataKey="evaluation" tick={<CustomAxisTick fontSize={fontSize} />} />
        )}
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <PolarRadiusAxis domain={[0, 100]} axisLine={false} tick={false} />
        <Radar
          name={userName}
          dataKey="percent"
          stroke={tailwindColors.purple[500]}
          strokeWidth={1.18}
          fill={`url(#${id})`}
          fillOpacity={0.4}
          dot={{
            r: 2,
            fillOpacity: 1,
          }}
          markerEnd="3"
        />
      </RadarChart>
    </ChartContainer>
  );
}

interface CustomAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: PRismEvaluationType;
  };
  fontSize?: number;
}

export const ICONS: Record<PRismEvaluationType, React.ElementType> = {
  COMMUNICATION: Users,
  PROACTIVITY: Wand2,
  PROBLEM_SOLVING: Wrench,
  RESPONSIBILITY: Flag,
  COOPERATION: Puzzle,
};

const CustomAxisTick = ({ x, y, payload, fontSize = 14 }: CustomAxisTickProps) => {
  if (!payload || !payload.value) return null;

  const index = PRISM_EVALUATIONS.indexOf(payload.value);
  const angle = (Math.PI * 2 * index) / PRISM_EVALUATIONS.length - Math.PI / 2;
  const radius = 15;

  const adjustedX = (x || 0) + Math.cos(angle) * radius;
  const adjustedY = (y || 0) + Math.sin(angle) * radius;

  const Icon = ICONS[payload.value];

  return (
    <g transform={`translate(${adjustedX},${adjustedY})`}>
      <text
        x={0}
        y={0}
        dy={20}
        textAnchor="middle"
        className="m-4 fill-gray-400"
        fontSize={fontSize}>
        {PRISM_EVALUATION_LABELS[payload.value]}
      </text>
      <foreignObject x={-10} y={-20} width={30} height={30}>
        <Icon className="h-5 w-5" />
      </foreignObject>
    </g>
  );
};

// 데이터 로딩 전 임시 데이터
export const defaultPRismChartData: PRismEvaluation[] = [
  {
    evaluation: 'COMMUNICATION',
    percent: 30,
  },
  {
    evaluation: 'PROACTIVITY',
    percent: 40,
  },
  {
    evaluation: 'PROBLEM_SOLVING',
    percent: 100,
  },
  {
    evaluation: 'RESPONSIBILITY',
    percent: 80,
  },
  {
    evaluation: 'COOPERATION',
    percent: 90,
  },
];
