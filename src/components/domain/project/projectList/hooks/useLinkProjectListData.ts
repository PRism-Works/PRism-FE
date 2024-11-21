import { useGetLinkProjectsByProjectName } from '@/hooks/queries/useProjectService';
import type { ProjectSummaryData } from '@/models/project/projectModels';

import { convertStringToDate } from '@/lib/dateTime';

export const useProjectListData = (searchProjectName: string) => {
  const { data, isLoading, isError } = useGetLinkProjectsByProjectName(searchProjectName);

  const projectList: ProjectSummaryData[] =
    data?.data?.map(
      (project): ProjectSummaryData => ({
        projectId: project.projectId,
        projectName: project.projectName,
        organizationName: project.organizationName,
        startDate: convertStringToDate(project.startDate),
        endDate: convertStringToDate(project.endDate),
        categories: project.categories,
      }),
    ) || [];

  // 데이터가 정상적으로 가지고와진 상태인지 판단하여 다른 컴포넌트를 보여준다.
  const isValidData = !(isLoading || projectList.length === 0 || isError);

  return { projectList, isValidData, isEmpty: projectList.length, isLoading, isError };
};
