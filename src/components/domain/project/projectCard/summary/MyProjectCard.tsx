import ShadowCard from '@/components/common/card/ShadowCard';
import {
  ProjectCategory,
  ProjectEvaluation,
  ProjectOrganization,
  ProjectPeriod,
  ProjectTitle,
} from './elements';
import ProjectVisibilityButton from '../../projectButton/ProjectVisibilityButton';

import { PROJECT_CARD_VARIANT, ProjectSummaryData } from '@/models/project/projectModels';

import useProjectCardClick from '../../hooks/useProjectCardClick';

interface MyProjectCardProps {
  projectData: ProjectSummaryData;
  forSaveImage: boolean;
}
const MyProjectCard = ({ projectData, forSaveImage }: MyProjectCardProps) => {
  const projectId = projectData.projectId;
  const { handleCardClick } = useProjectCardClick(PROJECT_CARD_VARIANT.MY_PROFILE, projectId);

  return (
    <ShadowCard onClick={handleCardClick}>
      <article className="flex min-h-[176px] justify-between">
        {/* 좌측 영역 */}
        <div className="flex w-[80%] items-center">
          <section className="flex h-full w-[250px] flex-shrink-0 flex-col justify-between">
            <header className="flex flex-col gap-4">
              <ProjectOrganization
                organizationName={projectData.organizationName || ''}
                forSaveImage={forSaveImage}
              />
              <ProjectTitle projectName={projectData.projectName} forSaveImage={forSaveImage} />
            </header>
            <ProjectPeriod startDate={projectData.startDate} endDate={projectData.endDate} />
          </section>
          <section>
            <ProjectEvaluation
              evaluation={projectData?.evaluation || ''}
              forSaveImage={forSaveImage}
            />
          </section>
        </div>
        {/* 우측 영역 */}
        <aside className="flex w-[20%] flex-col items-end justify-between">
          <ProjectCategory categories={projectData.categories || []} forSaveImage={forSaveImage} />
          <ProjectVisibilityButton
            projectId={projectId}
            initialVisibility={projectData.projectVisibility || false}
          />
        </aside>
      </article>
    </ShadowCard>
  );
};
export default MyProjectCard;
