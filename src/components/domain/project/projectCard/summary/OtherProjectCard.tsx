import ShadowCard from '@/components/common/card/ShadowCard';
import {
  ProjectCategory,
  ProjectEvaluation,
  ProjectOrganization,
  ProjectPeriod,
  ProjectTitle,
} from './elements';
import { PROJECT_CARD_VARIANT, ProjectSummaryData } from '@/models/project/projectModels';

import useProjectCardClick from '../hooks/useProjectCardClick';

interface OtherProjectCardProps {
  projectData: ProjectSummaryData;
  userId: string;
  forSaveImage: boolean;
}
const OtherProjectCard = ({ projectData, userId, forSaveImage }: OtherProjectCardProps) => {
  const projectId = projectData.projectId;
  const { handleCardClick } = useProjectCardClick(
    PROJECT_CARD_VARIANT.OTHER_PROFILE,
    projectId,
    userId,
  );

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
        <aside className="flex w-[20%] justify-end">
          <ProjectCategory categories={projectData.categories || []} forSaveImage={forSaveImage} />
        </aside>
      </article>
    </ShadowCard>
  );
};
export default OtherProjectCard;
