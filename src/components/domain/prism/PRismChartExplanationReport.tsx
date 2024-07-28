'use client';

import { useEffect, useState } from 'react';

import BorderCard from '@/components/common/card/BorderCard';
import ReportBlur from './report/ReportBlur';
import PRismChart, { defaultPRismChartData } from '@/components/common/chart/PRismChart';
import PRismExplanation from './report/PRismExplanation';
import type { PRismEvaluation } from '@/models/prism/prismModels';
import { useUserStore } from '@/stores/userStore';
import { useSingleProjectUserAnalysis } from '@/hooks/queries/usePRismService';
import { useUserProfileByUserId } from '@/hooks/queries/useUserService';

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
  const [prismChartData, setPRismChartData] = useState<PRismEvaluation[]>(defaultPRismChartData);

  // fromMyProfile = true : 그 프로젝트에서 나의 지표
  // fromMyProfile = false : 그 프로젝트에서 타인의 지표
  const loginUser = useUserStore((state) => state.user);
  const targetUserId = fromMyProfile ? loginUser?.userId : reportedUserId;

  // 조회 유저 데이터 가져오기
  const { data: userData } = useUserProfileByUserId(targetUserId || '');

  // 조회 유저의 프리즘 데이터 가져오기
  const { data, isLoading, isError } = useSingleProjectUserAnalysis(targetUserId || '', projectId);
  console.log(data);

  useEffect(() => {
    const reportData = data?.data;
    const isEmpty = data?.data.isEvaluationEmpty; // 비어있으면 defaultPRismChartData 값을 사용하도록 덮어쓰지 않는다.

    if (reportData && !isEmpty) {
      const userPRismChartData: PRismEvaluation[] = [
        {
          evaluation: 'COMMUNICATION',
          percent: reportData.prismData.communication,
        },
        {
          evaluation: 'PROACTIVITY',
          percent: reportData.prismData.proactivity,
        },
        {
          evaluation: 'PROBLEM_SOLVING',
          percent: reportData.prismData.problemSolving,
        },
        {
          evaluation: 'RESPONSIBILITY',
          percent: reportData.prismData.responsibility,
        },
        {
          evaluation: 'COOPERATION',
          percent: reportData.prismData.cooperation,
        },
      ];
      setPRismChartData(userPRismChartData);
    }
  }, [data]);

  return (
    <BorderCard className="relative flex-wrap gap-28 flex-center">
      {(!data?.data || data.data.isEvaluationEmpty) && (
        <ReportBlur fromMyProfile={fromMyProfile} isLoading={isLoading} isError={isError} />
      )}
      <div className="flex h-[330px] max-w-[330px] flex-col items-center gap-5 px-9 py-3">
        <div className="h-full w-full">
          <PRismChart userName={userData?.data.username} data={prismChartData} />
        </div>
      </div>
      <div className="rounded-[30px]px-9 flex min-h-[330px] max-w-[560px] gap-3 py-3 flex-col-center">
        <PRismExplanation userName={userData?.data.username} data={prismChartData} />
      </div>
    </BorderCard>
  );
}
