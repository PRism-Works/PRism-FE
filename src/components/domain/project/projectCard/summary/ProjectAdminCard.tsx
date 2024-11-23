import ShadowCard from '@/components/common/card/ShadowCard';
import { ProjectEvaluatedCount, ProjectOrganization, ProjectPeriod, ProjectTitle } from './ui';
import { PROJECT_CARD_VARIANT, ProjectSummaryData } from '@/models/project/projectModels';

import useProjectCardClick from '../../hooks/useProjectCardClick';
import ProjectEditDeleteButton from '../../projectButton/ProjectEditDeleteButton';
import ProjectSendEvaluationLink from '../../projectButton/ProjectSendEvaluationLink';
import ProjectEvaluationButton from '../../projectButton/ProjectEvaluationButton';

interface ProjectAdminCardProps {
  projectData: ProjectSummaryData;
}

const ProjectAdminCard = ({ projectData }: ProjectAdminCardProps) => {
  const projectId = projectData.projectId;
  const { handleCardClick } = useProjectCardClick(PROJECT_CARD_VARIANT.ADMIN, projectId);

  return (
    <ShadowCard onClick={handleCardClick}>
      <article className="flex min-h-[176px] justify-between">
        {/* 좌측 영역 */}
        <section className="flex w-full flex-col justify-between">
          <header className="flex flex-col gap-4">
            <ProjectOrganization organizationName={projectData.organizationName || ''} />
            <ProjectTitle projectName={projectData.projectName} />
          </header>
          <ProjectPeriod startDate={projectData.startDate} endDate={projectData.endDate} />
        </section>
        {/* 우측 영역 */}
        <aside className="flex flex-col items-end justify-between">
          {/* 프로젝트 수정/삭제 버튼 */}
          <ProjectEditDeleteButton projectId={projectId} />
          <div className="flex flex-col items-end gap-1">
            <ProjectEvaluatedCount evaluatedMembersCount={projectData.evaluatedMembersCount || 0} />
            <div className="flex gap-2">
              {/* 평가지 보내기 버튼 */}
              <ProjectSendEvaluationLink projectId={projectId} />
              {/* 프리즘 분석 갱신하기 버튼 */}
              <ProjectEvaluationButton projectId={projectId} />
            </div>
          </div>
        </aside>
      </article>
    </ShadowCard>
  );
};
export default ProjectAdminCard;
