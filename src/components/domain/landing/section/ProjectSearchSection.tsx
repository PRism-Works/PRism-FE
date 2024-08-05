import LandingSectionLayout from './LandingSectionLayout';
import ProjectSearchBar from '../../project/projectSearch/ProjectSearchBar';

export default function ProjectSearchSection() {
  return (
    <LandingSectionLayout
      title="흥미로운 프로젝트와 다양한 성향의 팀원 검색"
      subtitle="  프로젝트와 팀원을 검색해 나와 맞는 협업 성향의 팀원을 발견하세요.">
      <ProjectSearchBar mode="DARK" width="80%" />
    </LandingSectionLayout>
  );
}
