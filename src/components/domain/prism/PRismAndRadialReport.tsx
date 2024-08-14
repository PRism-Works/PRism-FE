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
import { useUserProfileByUserId } from '@/hooks/queries/useUserService';
import { formatPRismChartData, formatRadialChartData } from '@/lib/prism';

interface PRismAndRadialReportProps {
  reportedUserId?: string;
  fromMyProfile: boolean;
  forSaveImage?: boolean;
}

export default function PRismAndRadialReport({
  reportedUserId = '',
  fromMyProfile,
  forSaveImage = false,
}: PRismAndRadialReportProps) {
  const [prismChartData, setPRismChartData] = useState<PRismEvaluation[]>(defaultPRismChartData);
  const [radialChartData, setRadialChartData] = useState<RadialChartData>(
    defaultTripleRadialChartData,
  );

  // fromMyProfile = true : 내가 속한 전체 프로젝트의 종합 분석
  // fromMyProfile = false : 타인 유저가 속한 전체 프로젝트의 종합 분석
  const loginUser = useUserStore((state) => state.user);
  const targetUserId = fromMyProfile ? loginUser?.userId : reportedUserId;

  const { data: userData } = useUserProfileByUserId(targetUserId || '');

  const { data, isLoading, isError } = useUserOverallProjectAnalysis(targetUserId || '');
  console.log(data);

  useEffect(() => {
    const reportData = data?.data;
    const isEmpty = data?.data.isEvaluationEmpty; // 비어있으면 defaultPRismChartData 값을 사용하도록 덮어쓰지 않는다.

    if (reportData && !isEmpty) {
      const userPRismChartData = formatPRismChartData(reportData.prismData);
      const userRadialChartData: RadialChartData = {
        radialChartData: formatRadialChartData(reportData.radialData),
        keyword: reportData.radialData.keywords,
        evaluation: reportData.radialData.evaluation,
      };
      setPRismChartData(userPRismChartData);
      setRadialChartData(userRadialChartData);
    }
  }, [data]);

  return (
    <BorderCard className="relative flex-wrap gap-8 flex-center">
      {(!data?.data || data.data.isEvaluationEmpty) && (
        <ReportBlur
          forSaveImage={forSaveImage}
          isLoading={isLoading}
          isError={isError}
          fromMyProfile={fromMyProfile}
        />
      )}
      <div className="flex h-[330px] max-w-[330px] flex-col items-center gap-5 px-9 py-3">
        <div className="text-indigo-800 body6">{fromMyProfile && '나의'} PRism</div>
        <div className="h-full w-full">
          <PRismChart userName={userData?.data.username} data={prismChartData} />
        </div>
      </div>
      <div className="bg-gray-50 flex min-h-[330px] max-w-[560px] flex-col items-center gap-3 rounded-[30px] px-9 py-3">
        <div className="text-indigo-800 body6">{fromMyProfile && '나의'} PRism 분석 리포트</div>
        <TripleRadialChart data={radialChartData} forSaveImage={forSaveImage} />
      </div>
    </BorderCard>
  );
}
