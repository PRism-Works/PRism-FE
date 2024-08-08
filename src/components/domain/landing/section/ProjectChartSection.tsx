import { LandingIcons } from '@/assets/landing';
import LandingSectionLayout from './LandingSectionLayout';

const tags = ['배려', '도전정신', '책임감'];

const Tag = ({ label }: { label: string }) => (
  <span className="bg-white text-gray-600 h-8 rounded-[15px] bg-opacity-80 px-3 mobile1 flex-center">
    {label}
  </span>
);

export default function ProjectChartSection() {
  const { PRismChart } = LandingIcons;

  return (
    <LandingSectionLayout
      title="생성형 AI를 활용한 객관적인 평가 데이터"
      subtitle="나만의 강점 키워드를 확인하고 협업 능력 분석 리포트를 받아보세요.">
      <div className="gap-36 flex-center">
        <div className="py-12 flex-col-center">
          <PRismChart className="mb-12 w-[280px]" />
          <p className="text-white body2">5가지 SOFT SKILL 측정</p>
        </div>

        <div className="-mb-24 flex space-y-8 p-6 flex-col-center">
          <div className="flex space-x-4">
            {tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <p className="text-center text-gray-200 display4">
            문제점을 바로 파악하고 해결책을 생각하는 문제해결 능력이 <br />큰 장점인 사람인 것
            같습니다. 다만 진행 상황에 대해 <br />
            즉시 공유하는 팀워크 능력이 다소 부족합니다.
          </p>
          <div className="flex h-24 items-end text-white body2">강점 키워드와 팀원 평가 요약</div>
        </div>
      </div>
    </LandingSectionLayout>
  );
}
