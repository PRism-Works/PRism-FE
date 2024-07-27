'use client';

import { useState } from 'react';

import { ComponentSpinner } from '@/components/common/spinner';
import BorderCard from '@/components/common/card/BorderCard';
import ProjectRegisterButton from '@/components/domain/project/projectButton/ProjectRegisterButton';
import ProjectSearchBar from '@/components/domain/project/projectSearch/ProjectSearchBar';
import ProjectSummaryCard from '@/components/domain/project/projectCard/ProjectSummaryCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { useSearchProjects } from '@/hooks/queries/useProjectService';
import { useSearchStore } from '@/stores/searchStore';

import { convertTimestampToDate } from '@/lib/dateTime';

export default function SearchPage() {
  const searchCondition = useSearchStore((state) => state.searchCondition);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = 30; // 총 프로젝트가 30개라고 가정
  const itemsPerPage = 8; // 한 페이지에 8개씩 보여줌
  const totalPages = Math.ceil(totalItems / itemsPerPage); // 4

  const { data, isLoading, isError } = useSearchProjects({
    searchType: searchCondition.type,
    searchWord: searchCondition.keyword,
    categories: searchCondition.categories,
    pageNo: 0,
    pageSize: 8,
  });

  const searchProjects =
    data?.data.contents.map((content) => {
      return {
        projectId: content.projectId,
        projectname: content.projectName,
        startDate: convertTimestampToDate(content.startDate),
        endDate: convertTimestampToDate(content.endDate),
        organizationName: content.organizationName,
        categories: content.categories,
      };
    }) || [];

  const isValidData = !(isLoading || searchProjects.length === 0 || isError);

  const handleClickPaginationItem = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="absolute h-56 w-full bg-white flex-center">
        <section className="w-full max-w-[1500px] flex-center">
          <ProjectSearchBar
            defualtKeyword={searchCondition.keyword}
            defaultCategories={searchCondition.categories}
            defaultDetailVisible
          />
        </section>
      </div>
      <div className="container mx-auto mb-14 flex min-h-screen flex-col items-center gap-16 pt-60">
        <section className="flex w-full max-w-[1040px] flex-col gap-5">
          <h2 className="text-gray-900 body6">프로젝트 목록</h2>
          {!isValidData ? (
            <ValidInformation isLoading={isLoading} isError={isError} />
          ) : (
            <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              {searchProjects.map((projectData) => (
                <li key={projectData.projectId} className="w-full">
                  <ProjectSummaryCard projectData={projectData} />
                </li>
              ))}
            </ul>
          )}
        </section>
        <nav>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index} onClick={() => handleClickPaginationItem(index + 1)}>
                  <PaginationLink isActive={currentPage === index + 1}>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              {/* 필요 시 PaginationEllipsis 사용 */}
              {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </nav>
      </div>
    </>
  );
}

const ValidInformation = ({ isLoading, isError }: { isLoading: boolean; isError: boolean }) => {
  const isEmpty = !(isLoading || isError);
  const message = isError
    ? '프로젝트를 검색하는 중 오류가 발생했습니다.'
    : '일치하는 검색 결과가 없습니다.';
  const subMessage = isError
    ? '다시 시도해주세요.'
    : '오타가 없는지 확인하거나, 다른 검색어를 사용해 보세요.';

  return (
    <section className="gap-14 flex-col-center">
      <BorderCard className="h-[165px] w-full flex-col-center">
        {isLoading ? (
          <ComponentSpinner />
        ) : (
          <span className="gap-3 flex-col-center">
            <span className="text-gray-600 display6">{message}</span>
            <span className="text-gray-500 mobile2">{subMessage}</span>
          </span>
        )}
      </BorderCard>
      {isEmpty && (
        <div className="gap-4 flex-col-center">
          <span className="text-gray-600 mobile1">해당 프로젝트가 등록이 안 되어있나요?</span>
          <ProjectRegisterButton className="h-[45px] w-[210px]" />
        </div>
      )}
    </section>
  );
};
