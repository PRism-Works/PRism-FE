'use client';

import { useState, useEffect } from 'react';

import BorderCard from '@/components/common/card/BorderCard';
import TripleRadialChart, {
  defaultTripleRadialChartData,
  type RadialChartData,
} from './report/TripleRadialChart';
import ReportBlur from './report/ReportBlur';
import { useUserStore } from '@/stores/userStore';

interface RadialChartReportProps {
  reportedUserId?: string;
  fromMyProfile: boolean;
}

export default function RadialChartReport({
  reportedUserId,
  fromMyProfile,
}: RadialChartReportProps) {
  const [hasData, setHasData] = useState<boolean>(false);
  const [radialChartData] = useState<RadialChartData>(defaultTripleRadialChartData);

  // fromMyProfile: true : 내가 속한 전체 프로젝트의 종합 분석
  // fromMyProfile: false : 타인 유저가 속한 전체 프로젝트의 종합 분석
  const loginUser = useUserStore((state) => state.user);
  const targetUserId = fromMyProfile ? loginUser?.userId : reportedUserId;
  console.log(targetUserId);

  // TODO: API 연동 후 데이터를 받아와서 setHasData(true) 호출, 나중에 isPending으로 변경
  useEffect(() => {
    // 예시로서 setTimeout을 사용하여 데이터를 받아오는 시뮬레이션
    setTimeout(() => {
      // 데이터가 있을 경우 setHasData(true)를 호출
      setHasData(true); // 이 부분을 실제 API 응답에 따라 변경
    }, 1000); // 1초 후에 데이터를 받는다고 가정
  }, []);

  return (
    <BorderCard className="relative flex-wrap flex-center">
      {!hasData && <ReportBlur />}
      <TripleRadialChart data={radialChartData} radialParentClassName="gap-10" />
    </BorderCard>
  );
}
