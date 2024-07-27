'use client';

import { useEffect, useState } from 'react';
import BorderCard from '@/components/common/card/BorderCard';
import PRismChart, { defaultPRismChartData } from '@/components/common/chart/PRismChart';
import TripleRadialChart, {
  defaultTripleRadialChartData,
  type RadialChartData,
} from './report/TripleRadialChart';
import ReportBlur from './report/ReportBlur';
import type { PRismEvaluation } from '@/models/prism/prismModels';
import { useUserStore } from '@/stores/userStore';
import { useUserOverallProjectAnalysis } from '@/hooks/queries/usePRismService';

interface PRismAndRadialReportProps {
  reportedUserId?: string;
  fromMyProfile: boolean;
}

export default function PRismAndRadialReport({
  reportedUserId = '',
  fromMyProfile,
}: PRismAndRadialReportProps) {
  const [prismChartData, setPRismChartData] = useState<PRismEvaluation[]>(defaultPRismChartData);
  const [radialChartData, setRadialChartData] = useState<RadialChartData>(
    defaultTripleRadialChartData,
  );

  // fromMyProfile = true : 내가 속한 전체 프로젝트의 종합 분석
  // fromMyProfile = false : 타인 유저가 속한 전체 프로젝트의 종합 분석
  const loginUser = useUserStore((state) => state.user);
  const targetUserId = fromMyProfile ? loginUser?.userId : reportedUserId;

  const { data, isLoading, isError } = useUserOverallProjectAnalysis(targetUserId || '');
  console.log(data);

  useEffect(() => {
    if (data) {
      const userPRismChartData: PRismEvaluation[] = [
        {
          evaluation: 'COMMUNICATION',
          percent: data.prismData.communication,
        },
        {
          evaluation: 'PROACTIVITY',
          percent: data.prismData.proactivity,
        },
        {
          evaluation: 'PROBLEM_SOLVING',
          percent: data.prismData.problemSolving,
        },
        {
          evaluation: 'RESPONSIBILITY',
          percent: data.prismData.responsibility,
        },
        {
          evaluation: 'COOPERATION',
          percent: data.prismData.cooperation,
        },
      ];
      const userRadialChartData: RadialChartData = {
        radialChartData: {
          LEADERSHIP: data.radialData.leadership,
          RELIABILITY: data.radialData.reliability,
          TEAMWORK: data.radialData.teamwork,
        },
        keyword: data.radialData.keywords,
        evaluation: data.radialData.evaluation,
      };
      setPRismChartData(userPRismChartData);
      setRadialChartData(userRadialChartData);
    }
  }, [data]);

  return (
    <BorderCard className="relative flex-wrap gap-8 flex-center">
      {(!data || !data.radialData?.evaluation) && (
        <ReportBlur isLoading={isLoading} isError={isError} fromMyProfile={fromMyProfile} />
      )}
      <div className="flex h-[330px] max-w-[330px] flex-col items-center gap-5 px-9 py-3">
        <div className="text-indigo-800 body6">{fromMyProfile && '나의'} PRism</div>
        <div className="h-full w-full">
          <PRismChart data={prismChartData} />
        </div>
      </div>
      <div className="flex min-h-[330px] max-w-[560px] flex-col items-center gap-3 rounded-[30px] bg-gray-50 px-9 py-3">
        <div className="text-indigo-800 body6">{fromMyProfile && '나의'} PRism 분석 리포트</div>
        <TripleRadialChart data={radialChartData} />
      </div>
    </BorderCard>
  );
}
