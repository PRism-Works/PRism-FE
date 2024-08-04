import ChartIndicators from '../ChartIndicators';
import ProjectRegisterButton from '../../project/projectButton/ProjectRegisterButton';
import LandingSectionLayout from './LandingSectionLayout';

export default function ProjectRegisterSection() {
  return (
    <LandingSectionLayout
      title="프로젝트의 마무리를 의미 있게"
      subtitle="프로젝트 등록으로 나의 SOFT SKILL 분석을 시작하세요.">
      <ChartIndicators />
      <ProjectRegisterButton className="mt-16 h-[48px] w-[230px]" />
    </LandingSectionLayout>
  );
}
