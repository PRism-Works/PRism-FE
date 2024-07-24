'use client';

import { useState, useEffect } from 'react';
import BorderCard from '@/components/common/card/BorderCard';
import PRismChart, { defaultPRismChartData } from '@/components/common/chart/PRismChart';
import TripleRadialChart, {
  defaultTripleRadialChartData,
  type RadialChartData,
} from './report/TripleRadialChart';
import ReportBlur from './report/ReportBlur';
import type { PRismEvaluation } from '@/models/prism/prismModels';

interface OverallPRismReportProps {
  fromMyProfile: boolean;
}

export default function OverallPRismReport({ fromMyProfile }: OverallPRismReportProps) {
  const [hasData, setHasData] = useState<boolean>(false);
  const [chartData] = useState<PRismEvaluation[]>(defaultPRismChartData);
  const [radialChartData] = useState<RadialChartData>(defaultTripleRadialChartData);

  // TODO: API 연동 후 데이터를 받아와서 setHasData(true) 호출, 나중에 isPending으로 변경
  useEffect(() => {
    // 예시로서 setTimeout을 사용하여 데이터를 받아오는 시뮬레이션
    setTimeout(() => {
      // 데이터가 있을 경우 setHasData(true)를 호출
      setHasData(true); // 이 부분을 실제 API 응답에 따라 변경
    }, 1000); // 1초 후에 데이터를 받는다고 가정
  }, []);

  return (
    <BorderCard className="relative flex-wrap gap-8 flex-center">
      {!hasData && <ReportBlur />}
      <div className="flex h-[330px] max-w-[330px] flex-col items-center gap-5 px-9 py-3">
        <div className="text-indigo-800 body6">{fromMyProfile && '나의'} PRism</div>
        <div className="h-full w-full">
          <PRismChart data={chartData} />
        </div>
      </div>
      <div className="flex min-h-[330px] max-w-[560px] flex-col items-center gap-3 rounded-[30px] bg-gray-50 px-9 py-3">
        <div className="text-indigo-800 body6">{fromMyProfile && '나의'} PRism 분석 리포트</div>
        <TripleRadialChart data={radialChartData} />
      </div>
    </BorderCard>
  );
}
