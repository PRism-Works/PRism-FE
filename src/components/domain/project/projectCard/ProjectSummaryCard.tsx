'use client';

import { cn } from '@/lib/utils';

import TagInput from '@/components/common/input/TagInput';
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
import { formatDateToDotSeparatedYYYYMMDD } from '@/lib/dateTime';
import { useRouter } from 'next/navigation';

interface ProjectSummaryCardProps {
  projectData: ProjectSummaryData;
  userId?: string;
  variant?: ProjectSummaryCardVariant;
}

export default function ProjectSummaryCard({
  projectData,
  userId = '',
  variant = PROJECT_CARD_VARIANT.SEARCH_RESULT,
}: ProjectSummaryCardProps) {
  const router = useRouter();
  const projectId = projectData.projectId;
  const isCardDisabled =
    variant === PROJECT_CARD_VARIANT.ADMIN || variant === PROJECT_CARD_VARIANT.LINK_PREVIEW;
  const handleClick = () => {
    if (isCardDisabled) return;
    const routes = {
      [PROJECT_CARD_VARIANT.SEARCH_RESULT]: `/project/${projectId}`,
      [PROJECT_CARD_VARIANT.MY_PROFILE]: `/project/my/${projectId}`,
      [PROJECT_CARD_VARIANT.OTHER_PROFILE]: `/project/user/${userId}/${projectId}`,
    };
    const route = routes[variant];

    if (route) {
      router.push(route);
    } else {
      alert('이동할 페이지가 없습니다.');
    }
  };
  return (
    <ShadowCard
      className={cn(isCardDisabled && 'cursor-default active:bg-white')}
      onClick={handleClick}>
      <div className="flex min-h-[176px] flex-col justify-between lg:h-44 lg:flex-row">
        <div className="mb-4 flex w-full flex-wrap gap-3 sm:gap-6 lg:mb-0 lg:w-[80%] lg:gap-12">
          <LeftSection projectData={projectData} />
          {(variant === PROJECT_CARD_VARIANT.MY_PROFILE ||
            variant === PROJECT_CARD_VARIANT.OTHER_PROFILE) && (
            <EvaluationSection evaluation={projectData?.evaluation || ''} />
          )}
        </div>
        <RightSection variant={variant} projectData={projectData} />
      </div>
    </ShadowCard>
  );
}

const LeftSection = ({ projectData }: { projectData: ProjectSummaryData }) => (
  <section className="flex w-[250px] flex-shrink-0 flex-col justify-between gap-2">
    <header className="flex flex-col gap-4 overflow-hidden">
      <p
        className={cn(
          'w-fit rounded-[20px] bg-gray-600 px-3 text-white mobile1',
          projectData.organizationName || 'bg-gray-400',
        )}>
        {projectData.organizationName || '소속 없음'}
      </p>
      <h2 className="overflow-y-auto text-gray-800 body7">{projectData.projectName}</h2>
    </header>
    <footer className="flex-shrink-0 text-gray-500 display5">
      <time>{formatDateToDotSeparatedYYYYMMDD(projectData.startDate)}</time> -{' '}
      <time>{formatDateToDotSeparatedYYYYMMDD(projectData.endDate)}</time>
    </footer>
  </section>
);

const EvaluationSection = ({ evaluation }: { evaluation: string }) => (
  <section className="flex flex-col justify-center">
    <h3 className="text-gray-400 mobile1">팀원 평가 요약</h3>
    <p className={cn('overflow-y-auto text-gray-800 display4', evaluation || 'text-gray-300')}>
      {evaluation || '등록된 한 줄 평가가 없습니다.'}
    </p>
  </section>
);

const RightSection = ({
  variant,
  projectData,
}: {
  variant: ProjectSummaryCardVariant;
  projectData: ProjectSummaryData;
}) => {
  const projectId = projectData.projectId;
  return (
    <aside className="flex w-full flex-col justify-between gap-2 lg:w-[20%] lg:items-end">
      {variant !== PROJECT_CARD_VARIANT.ADMIN && (
        // 프로젝트 카테고리 (관리자 모드에서는 삭제, 수정 버튼 표시)
        <ul className="flex gap-1">
          {projectData.categories?.map((category, index) => (
            <li key={index}>
              <TagInput value={category} isDisabled />
            </li>
          ))}
        </ul>
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
            <p className="flex items-end gap-2">
              <span className="text-gray-500 display5">지금까지 평가한 팀원 수:</span>
              <strong className="text-purple-500 display6">
                {projectData.evaluatedMembersCount || 0}
              </strong>
            </p>
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
