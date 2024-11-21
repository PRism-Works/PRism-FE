'use client';

import BorderCard from '@/components/common/card/BorderCard';
import InformationTooltip from '@/components/common/tooltip/InformationTooltip';
import type { ProjectSummaryData } from '@/models/project/projectModels';
import { useGetParticipatingProjects } from '@/hooks/queries/useProjectService';
import { convertStringToDate } from '@/lib/dateTime';
import { ComponentSpinner } from '@/components/common/spinner';
import { MyProjectCard, OtherProjectCard } from '../projectCard/summary';

interface ParticipatingProjectListProps {
  userId?: string;
  fromMyProfile: boolean;
  forSaveImage?: boolean;
}

export default function ParticipatingProjectList({
  userId = '',
  fromMyProfile,
  forSaveImage = false,
}: ParticipatingProjectListProps) {
  // 타인 참여 프로젝트 리스트 조회인데 userId가 넘어오지 않은 경우 빈값으로 보내줘서 쿼리 조건이 유효하지 않게 처리
  const { data, isLoading, isError } = useGetParticipatingProjects(fromMyProfile, userId);

  const projectList = data?.data;
  const projectDatas: ProjectSummaryData[] = !projectList
    ? []
    : projectList.map((project) => {
        return {
          projectId: project.projectId,
          projectName: project.projectName,
          startDate: convertStringToDate(project.startDate),
          endDate: convertStringToDate(project.endDate),
          organizationName: project.organizationName,
          categories: project.categories,
          evaluatedMembersCount: project.surveyParticipants,
          projectVisibility: project.anonyVisibility,
          evaluation: project.userEvaluation,
        };
      });

  // 데이터가 정상적으로 가지고와진 상태인지 판단하여 다른 컴포넌트를 보여준다.
  const isValidData = !(isLoading || projectDatas.length === 0 || isError);

  return (
    <>
      <div className="flex items-center gap-1">
        <h2 className="text-gray-900 body6">프로젝트 목록</h2>
        {!forSaveImage && (
          <InformationTooltip message="프로젝트 참여 비공개로 전환 시, 해당 프로젝트에 '익명'으로 표시돼요." />
        )}
      </div>
      {!isValidData ? (
        <BorderCard className="h-[165px] w-full flex-col-center">
          {isLoading ? (
            <ComponentSpinner />
          ) : isError ? (
            <span className="text-gray-600 display6">
              참여 프로젝트를 로드하는 중 오류가 발생했습니다.
            </span>
          ) : (
            <span className="text-gray-600 display6">참여한 프로젝트가 없습니다.</span>
          )}
        </BorderCard>
      ) : (
        <ul className="flex flex-col gap-4">
          {projectDatas.map((projectData, index) => (
            <li key={index}>
              {fromMyProfile ? (
                <MyProjectCard projectData={projectData} forSaveImage={forSaveImage} />
              ) : (
                <OtherProjectCard
                  projectData={projectData}
                  userId={userId}
                  forSaveImage={forSaveImage}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
