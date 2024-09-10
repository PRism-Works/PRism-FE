import ShadowCard from '@/components/common/card/ShadowCard';
import { ProjectCategory, ProjectOrganization, ProjectPeriod, ProjectTitle } from './elements';
import { PROJECT_CARD_VARIANT, ProjectSummaryData } from '@/models/project/projectModels';

import useProjectCardClick from '../../hooks/useProjectCardClick';
import ProjectLinkButton from '../../projectButton/ProjectLinkButton';

interface ProjectLinkCardProps {
  projectData: ProjectSummaryData;
}

const ProjectLinkCard = ({ projectData }: ProjectLinkCardProps) => {
  const projectId = projectData.projectId;
  const { handleCardClick } = useProjectCardClick(PROJECT_CARD_VARIANT.LINK_PREVIEW, projectId);

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
          <ProjectCategory categories={projectData.categories || []} />
          <ProjectLinkButton projectId={projectId} />
        </aside>
      </article>
    </ShadowCard>
  );
};
export default ProjectLinkCard;
