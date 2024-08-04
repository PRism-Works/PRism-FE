import { LandingIcons } from '@/assets/landing';
import LandingSectionLayout from './LandingSectionLayout';

export default function ProjectSurveySection() {
  const { Survey } = LandingIcons;

  return (
    <LandingSectionLayout
      title="모든 팀원의 성장을 위한 평가 구성"
      subtitle="객관식과 주관식 질문을 이용한 효율적인 팀원 평가를 경험해 보세요.">
      <Survey className="w-full" style={{ width: 'clamp(250px, 75vw, 880px)' }} />
    </LandingSectionLayout>
  );
}
