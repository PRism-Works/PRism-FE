'use client';

import { useState, useEffect } from 'react';
import BorderCard from '@/components/common/card/BorderCard';
import TagInput from '@/components/common/input/TagInput';
import RadialChart from '@/components/common/chart/RadialChart';
import PRismChart, { Evaluation } from '@/components/common/chart/PRismChart';
import { RADIAL_EVALUATION_TYPES } from '@/models/evaluation/evaluationModels';

export default function OverallPRismReport() {
  const [hasData, setHasData] = useState<boolean>(false);

  // TODO: API 연동 후 데이터를 받아와서 setHasData(true) 호출
  useEffect(() => {
    // 예시로서 setTimeout을 사용하여 데이터를 받아오는 시뮬레이션
    setTimeout(() => {
      // 데이터가 있을 경우 setHasData(true)를 호출
      setHasData(true); // 이 부분을 실제 API 응답에 따라 변경
    }, 1000); // 1초 후에 데이터를 받는다고 가정
  }, []);

  const chartData: Evaluation[] = [
    {
      evaluation: 'COMMUNICATION',
      percent: 60,
    },
    {
      evaluation: 'PROACTIVITY',
      percent: 50,
    },
    {
      evaluation: 'PROBLEM_SOLVING',
      percent: 70,
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

  const prismTextData = [
    { label: '키워드', value: ['배려', '책임감', '도전정신'] },
    {
      label: '한 줄 요약',
      value:
        '문제점을 바로 파악하고 해결책을 생각하는 문제해결능력이 큰 장점인 사람입니다. 다만 진행상황에 대해 즉시 공유하는 팀워크 능력이 다소 부족하다.',
    },
  ];

  return (
    <>
      <BorderCard className="relative flex-wrap gap-8 flex-center">
        {!hasData && (
          <div className="absolute inset-1 z-10 flex rounded-[30px] bg-white bg-opacity-70 backdrop-blur-md flex-col-center">
            <p className="text-gray-700 body6">아직 나의 PRism이 없어요!</p>
            <p className="text-purple-800 display4">
              프로젝트를 등록하고 나만의 PRism을 시작해 보세요.
            </p>
          </div>
        )}
        <div
          className={`flex h-[330px] max-w-[330px] flex-col items-center gap-5 px-9 py-3 ${!hasData ? 'blur-sm' : ''}`}>
          <div className="text-indigo-800 body6">나의 PRism</div>
          <div className="h-full w-full">
            <PRismChart data={chartData} />
          </div>
        </div>
        <div
          className={`flex h-[330px] max-w-[560px] flex-col items-center gap-3 rounded-[30px] bg-gray-50 px-9 py-3 ${!hasData ? 'blur-sm' : ''}`}>
          <div className="text-indigo-800 body6">나의 PRism 분석 리포트</div>
          <div className="gap-3 flex-col-center">
            <div className="flex-center">
              <RadialChart type={RADIAL_EVALUATION_TYPES.LEADERSHIP} value={70} />
              <RadialChart type={RADIAL_EVALUATION_TYPES.RELIABILITY} value={80} />
              <RadialChart type={RADIAL_EVALUATION_TYPES.CHARISMA} value={50} />
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-2">
              {prismTextData.map((item, index) => (
                <div key={index} className="contents">
                  <div className="flex text-gray-400 mobile1">{item.label}</div>
                  <div className="flex gap-1 text-gray-800 display5">
                    {!item.value
                      ? '-'
                      : item.label === '키워드' && Array.isArray(item.value)
                        ? item.value.map((value, index) => (
                            <TagInput key={index} value={value} isDisabled />
                          ))
                        : item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BorderCard>
    </>
  );
}
