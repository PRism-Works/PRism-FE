'use client';

import BorderCard from '@/components/common/card/BorderCard';
import { ProjectLinkCard } from '../projectCard/summary';
import { ComponentSpinner } from '@/components/common/spinner';

import { useProjectListData } from './hooks/useLinkProjectListData';

interface LinkProjectListProps {
  searchProjectName: string;
}
export default function LinkProjectList({ searchProjectName }: LinkProjectListProps) {
  const { projectList, isValidData, isEmpty, isLoading, isError } =
    useProjectListData(searchProjectName);

  if (isValidData) {
    return (
      <ul className="flex flex-col gap-4">
        {projectList.map((projectData) => (
          <li key={projectData.projectId}>
            <ProjectLinkCard projectData={projectData} />
          </li>
        ))}
      </ul>
    );
  }

  if (isEmpty) {
    return (
      <BorderCard className="h-[165px] w-full flex-col-center">
        <span className="text-gray-600 display6">일치하는 검색 결과가 없습니다.</span>
      </BorderCard>
    );
  }

  if (isLoading) {
    return (
      <BorderCard className="h-[165px] w-full flex-col-center">
        <ComponentSpinner />
      </BorderCard>
    );
  }

  if (isError) {
    return (
      <BorderCard className="h-[165px] w-full flex-col-center">
        <span className="text-gray-600 display6">
          연동할 프로젝트를 로드하는 중 오류가 발생했습니다.
        </span>
      </BorderCard>
    );
  }
}
