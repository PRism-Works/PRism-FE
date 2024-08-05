'use client';

import { useEffect, useState } from 'react';

import BorderCard from '@/components/common/card/BorderCard';
import TripleRadialChart, {
  defaultTripleRadialChartData,
  type RadialChartData,
} from './report/TripleRadialChart';
import ReportBlur from './report/ReportBlur';
import { useUserStore } from '@/stores/userStore';
import { useSingleProjectUserAnalysis } from '@/hooks/queries/usePRismService';

interface RadialChartReportProps {
  fromMyProfile: boolean;
  projectId: number;
  reportedUserId?: string;
  forSaveImage?: boolean;
}

export default function RadialChartReport({
  fromMyProfile,
  projectId,
  reportedUserId,
  forSaveImage = false,
}: RadialChartReportProps) {
  const [radialChartData, setRadialChartData] = useState<RadialChartData>(
    defaultTripleRadialChartData,
  );

  // fromMyProfile = true : 내가 속한 전체 프로젝트의 종합 분석
  // fromMyProfile = false : 타인 유저가 속한 전체 프로젝트의 종합 분석
  const loginUser = useUserStore((state) => state.user);
  const targetUserId = fromMyProfile ? loginUser?.userId : reportedUserId;

  const { data, isLoading, isError } = useSingleProjectUserAnalysis(targetUserId || '', projectId);
  console.log(data);

  useEffect(() => {
    const reportData = data?.data;
    const isEmpty = data?.data.isEvaluationEmpty; // 비어있으면 defaultPRismChartData 값을 사용하도록 덮어쓰지 않는다.

    if (reportData && !isEmpty) {
      const userRadialChartData: RadialChartData = {
        radialChartData: {
          LEADERSHIP: (reportData.radialData.leadership / 5) * 100,
          RELIABILITY: (reportData.radialData.reliability / 5) * 100,
          TEAMWORK: (reportData.radialData.teamwork / 5) * 100,
        },
        keyword: reportData.radialData.keywords,
        evaluation: reportData.radialData.evaluation,
      };
      setRadialChartData(userRadialChartData);
    }
  }, [data]);

  return (
    <BorderCard className="relative flex-wrap flex-center">
      {(!data?.data || data.data.isEvaluationEmpty) && (
        <ReportBlur
          fromMyProfile={fromMyProfile}
          isLoading={isLoading}
          isError={isError}
          forSaveImage={forSaveImage}
        />
      )}
      <TripleRadialChart data={radialChartData} radialParentClassName="gap-10" />
    </BorderCard>
  );
}
