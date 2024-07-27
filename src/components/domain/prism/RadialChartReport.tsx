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
}

export default function RadialChartReport({
  fromMyProfile,
  projectId,
  reportedUserId,
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
    if (data) {
      const userRadialChartData: RadialChartData = {
        radialChartData: {
          LEADERSHIP: data.radialData.leadership,
          RELIABILITY: data.radialData.reliability,
          TEAMWORK: data.radialData.teamwork,
        },
        keyword: data.radialData.keywords,
        evaluation: data.radialData.evaluation,
      };
      setRadialChartData(userRadialChartData);
    }
  }, [data]);

  return (
    <BorderCard className="relative flex-wrap flex-center">
      {!data && (
        <ReportBlur fromMyProfile={fromMyProfile} isLoading={isLoading} isError={isError} />
      )}
      <TripleRadialChart data={radialChartData} radialParentClassName="gap-10" />
    </BorderCard>
  );
}
