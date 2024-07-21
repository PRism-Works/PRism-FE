'use client';

import BorderCard from '@/components/common/card/BorderCard';
import { ComponentSpinner } from '@/components/common/spinner';
import ProjectSummaryCard from '@/components/domain/project/projectCard/ProjectSummaryCard';
import { useGetRegisteredProjects } from '@/hooks/queries/useProjectService';
import { convertStringToDate } from '@/lib/dateTime';
import { PROJECT_CARD_VARIANT, type ProjectSummaryData } from '@/models/project/projectModels';

export default function RegisteredProjectList() {
  const { data, isLoading, isError } = useGetRegisteredProjects();

  const projectList = data?.data;
  const projectDatas: ProjectSummaryData[] = !projectList
    ? []
    : projectList.map((project) => {
        return {
          projectId: project.projectId,
          projectname: project.projectName,
          startDate: convertStringToDate(project.startDate),
          endDate: convertStringToDate(project.endDate),
          organizationName: project.organizationName,
          categories: project.categories,
          evaluatedMembersCount: project.surveyParcitipants,
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
          등록 프로젝트를 로드하는 중 오류가 발생했습니다.
        </span>
      ) : projectDatas.length === 0 ? (
        <span className="text-gray-600 display6">등록한 프로젝트가 없습니다.</span>
      ) : null}
    </BorderCard>
  ) : (
    <ul className="flex flex-col gap-4">
      {projectDatas.map((projectData) => (
        <li key={projectData.projectId}>
          <ProjectSummaryCard variant={PROJECT_CARD_VARIANT.ADMIN} projectData={projectData} />
        </li>
      ))}
    </ul>
  );
}
