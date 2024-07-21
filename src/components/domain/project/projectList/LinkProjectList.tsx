'use client';

import BorderCard from '@/components/common/card/BorderCard';
import { ComponentSpinner } from '@/components/common/spinner';
import ProjectSummaryCard from '@/components/domain/project/projectCard/ProjectSummaryCard';
import { useGetLinkProjectsByProjectName } from '@/hooks/queries/useProjectService';
import { convertStringToDate } from '@/lib/dateTime';
import { PROJECT_CARD_VARIANT, type ProjectSummaryData } from '@/models/project/projectModels';

interface LinkProjectListProps {
  searchProjectName: string;
}
export default function LinkProjectList({ searchProjectName }: LinkProjectListProps) {
  const { data, isLoading, isError } = useGetLinkProjectsByProjectName(searchProjectName);

  const projectList = data?.data;
  const projectDatas: ProjectSummaryData[] = !projectList
    ? []
    : projectList.map((project) => {
        return {
          projectId: project.projectId,
          projectname: project.projectName,
          organizationName: project.organizationName,
          startDate: convertStringToDate(project.startDate),
          endDate: convertStringToDate(project.endDate),
          categories: project.categories,
        };
      });

  // 데이터가 정상적으로 가지고와진 상태인지 판단하여 다른 컴포넌트를 보여준다.
  const isValidData = !(isLoading || projectDatas.length === 0 || isError);

  return !isValidData ? (
    <BorderCard className="h-[165px] w-full flex-col-center">
      {isLoading ? (
        <ComponentSpinner />
      ) : isError ? (
        <span className="text-gray-600 display6">
          연동할 프로젝트를 로드하는 중 오류가 발생했습니다.
        </span>
      ) : projectDatas.length === 0 ? (
        <span className="text-gray-600 display6">일치하는 검색 결과가 없습니다.</span>
      ) : null}
    </BorderCard>
  ) : (
    <ul className="flex flex-col gap-4">
      {projectDatas.map((projectData, index) => (
        <li key={index}>
          <ProjectSummaryCard
            variant={PROJECT_CARD_VARIANT.LINK_PREVIEW}
            projectData={projectData}
          />
        </li>
      ))}
    </ul>
  );
}
