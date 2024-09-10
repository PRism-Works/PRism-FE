'use client';

import { cn } from '@/lib/utils';

import ShadowCard from '@/components/common/card/ShadowCard';
import ProjectVisibilityButton from '../projectButton/ProjectVisibilityButton';

import ProjectLinkButton from '../projectButton/ProjectLinkButton';
import ProjectEditDeleteButton from '../projectButton/ProjectEditDeleteButton';
import ProjectEvaluationButton from '../projectButton/ProjectEvaluationButton';
import ProjectSendEvaluationLink from '../projectButton/ProjectSendEvaluationLink';

import {
  PROJECT_CARD_VARIANT,
  type ProjectSummaryCardVariant,
  type ProjectSummaryData,
} from '@/models/project/projectModels';

import useProjectCardClick from './hooks/useProjectCardClick';

import {
  ProjectCategory,
  ProjectEvaluation,
  ProjectEvaluatedCount,
  ProjectOrganization,
  ProjectPeriod,
  ProjectTitle,
} from './elements';

interface ProjectSummaryCardProps {
  projectData: ProjectSummaryData;
  userId?: string;
  variant?: ProjectSummaryCardVariant;
  forSaveImage?: boolean;
}

export default function ProjectSummaryCard({
  projectData,
  userId = '',
  variant = PROJECT_CARD_VARIANT.SEARCH_RESULT,
  forSaveImage = false,
}: ProjectSummaryCardProps) {
  const projectId = projectData.projectId;

  // 프로젝트 카드 disabled 조건 : 관리자용, 연동용, 이미지 저장용
  const isCardDisabled =
    variant === PROJECT_CARD_VARIANT.ADMIN ||
    variant === PROJECT_CARD_VARIANT.LINK_PREVIEW ||
    forSaveImage;

  const { handleCardClick } = useProjectCardClick(variant, projectId, userId);

  return (
    <ShadowCard
      className={cn(isCardDisabled && 'cursor-default active:bg-white')}
      onClick={handleCardClick}>
      <div className="flex min-h-[176px] flex-col justify-between lg:h-44 lg:flex-row">
        <div className="mb-4 flex w-full gap-3 sm:gap-6 lg:mb-0 lg:w-[80%] lg:gap-12">
          <LeftSection projectData={projectData} forSaveImage={forSaveImage} />
          {(variant === PROJECT_CARD_VARIANT.MY_PROFILE ||
            variant === PROJECT_CARD_VARIANT.OTHER_PROFILE) && (
            <ProjectEvaluation
              evaluation={projectData?.evaluation || ''}
              forSaveImage={forSaveImage}
            />
          )}
        </div>
        <RightSection variant={variant} projectData={projectData} forSaveImage={forSaveImage} />
      </div>
    </ShadowCard>
  );
}

const LeftSection = ({
  projectData,
  forSaveImage,
}: {
  projectData: ProjectSummaryData;
  forSaveImage: boolean;
}) => {
  return (
    <section className="flex w-[250px] flex-shrink-0 flex-col justify-between gap-2">
      <header className={cn('flex flex-col gap-4', !forSaveImage && 'overflow-hidden')}>
        <ProjectOrganization
          organizationName={projectData.organizationName || ''}
          forSaveImage={forSaveImage}
        />
        <ProjectTitle projectName={projectData.projectName} forSaveImage={forSaveImage} />
      </header>
      <ProjectPeriod startDate={projectData.startDate} endDate={projectData.endDate} />
    </section>
  );
};

const RightSection = ({
  variant,
  projectData,
  forSaveImage,
}: {
  variant: ProjectSummaryCardVariant;
  projectData: ProjectSummaryData;
  forSaveImage: boolean;
}) => {
  const projectId = projectData.projectId;
  return (
    <aside className="flex w-full flex-col justify-between gap-2 lg:w-[20%] lg:items-end">
      {variant !== PROJECT_CARD_VARIANT.ADMIN && (
        // 프로젝트 카테고리 (관리자 모드에서는 삭제, 수정 버튼 표시)
        <ProjectCategory categories={projectData.categories || []} forSaveImage={forSaveImage} />
      )}
      {variant === PROJECT_CARD_VARIANT.MY_PROFILE && (
        // 로그인 사용쟈의 프로젝트 공개, 비공개 처리 버튼
        <ProjectVisibilityButton
          projectId={projectId}
          initialVisibility={projectData.projectVisibility || false}
        />
      )}
      {variant === PROJECT_CARD_VARIANT.LINK_PREVIEW && (
        // 프로젝트 연동하기 버튼
        <ProjectLinkButton projectId={projectId} />
      )}
      {variant === PROJECT_CARD_VARIANT.ADMIN && (
        <>
          {/* 프로젝트 삭제/수정 버튼 */}
          <ProjectEditDeleteButton projectId={projectId} />
          <footer className="flex flex-col items-end gap-1">
            <ProjectEvaluatedCount evaluatedMembersCount={projectData.evaluatedMembersCount || 0} />
            <div className="flex flex-col gap-2 sm:flex-row">
              {/* 평가지 보내기 버튼 */}
              <ProjectSendEvaluationLink projectId={projectId} />
              {/* 프리즘 분석 갱신하기 버튼 */}
              <ProjectEvaluationButton projectId={projectId} />
            </div>
          </footer>
        </>
      )}
    </aside>
  );
};
