'use client';

import { useState } from 'react';

import BorderCard from '@/components/common/card/BorderCard';
import ReportBlur from './report/ReportBlur';
import PRismChart, { defaultPRismChartData } from '@/components/common/chart/PRismChart';
import PRismExplanation from './report/PRismExplanation';
import type { PRismEvaluation } from '@/models/prism/prismModels';
import { useUserStore } from '@/stores/userStore';
import { useGetPRismProjectUserReport } from '@/hooks/queries/usePRismService';

// 유저 -> 프로젝트 상세 조회 시 나타나는 것.

interface PRismChartExplanationReportProps {
  fromMyProfile: boolean;
  projectId: number;
  reportedUserId?: string;
}
export default function PRismChartExplanationReport({
  fromMyProfile,
  projectId,
  reportedUserId = '',
}: PRismChartExplanationReportProps) {
  const [chartData] = useState<PRismEvaluation[]>(defaultPRismChartData);

  // fromMyProfile = true : 그 프로젝트에서 나의 지표
  // fromMyProfile = false : 그 프로젝트에서 타인의 지표
  const loginUser = useUserStore((state) => state.user);
  const targetUserId = fromMyProfile ? loginUser?.userId : reportedUserId;

  const { data, isLoading, isError } = useGetPRismProjectUserReport(targetUserId || '', projectId);
  console.log(data);

  return (
    <BorderCard className="relative flex-wrap gap-28 flex-center">
      {!data && (
        <ReportBlur fromMyProfile={fromMyProfile} isLoading={isLoading} isError={isError} />
      )}
      <div className="flex h-[330px] max-w-[330px] flex-col items-center gap-5 px-9 py-3">
        <div className="h-full w-full">
          <PRismChart data={chartData} />
        </div>
      </div>
      <div className="rounded-[30px]px-9 flex min-h-[330px] max-w-[560px] gap-3 py-3 flex-col-center">
        <PRismExplanation userName="김이름" data={chartData} />
      </div>
    </BorderCard>
  );
}
