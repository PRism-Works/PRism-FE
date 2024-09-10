'use client';

import { useEffect, useState } from 'react';
import useIsDarkMode from '@/hooks/useIsDarkMode';

import { ComponentSpinner } from '@/components/common/spinner';
import BorderCard from '@/components/common/card/BorderCard';
import ProjectRegisterButton from '@/components/domain/project/projectButton/ProjectRegisterButton';
import ProjectSearchBar from '@/components/domain/project/projectSearch/ProjectSearchBar';

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
import { cn } from '@/lib/utils';
import { SearchProjectCard } from '@/components/domain/project/projectCard/summary';

const ITEMS_PER_PAGE = 8; // 한 페이지에 나올 아이템의 최대 개수
const DEFAULT_ITEMS_TOTAL_COUNT = 1; // 데이터를 받아오기 전, 아이템 총 개수 기본값 / 한 페이지만 떠도 되니까 1로 둠

export default function SearchPage() {
  const isDarkMode = useIsDarkMode();

  // 검색 조건
  const searchCondition = useSearchStore((state) => state.searchCondition);

  // 현재 검색 페이지
  const [currentPage, setCurrentPage] = useState(0); // 0부터 시작, 0이 1페이지

  // 조건에 따른 검색 결과 (api)
  const { data, isLoading, isError } = useSearchProjects({
    searchType: searchCondition.type,
    searchWord: searchCondition.keyword,
    categories: searchCondition.categories,
    pageNo: currentPage,
    pageSize: ITEMS_PER_PAGE, // 한 화면에 8개 고정
  });

  // 검색 결과 데이터 프로세싱
  const searchProjects =
    data?.data.contents.map((content) => {
      return {
        projectId: content.projectId,
        projectName: content.projectName,
        startDate: convertTimestampToDate(content.startDate),
        endDate: convertTimestampToDate(content.endDate),
        organizationName: content.organizationName,
        categories: content.categories,
      };
    }) || [];

  // 데이터 유효성 검사
  const isValidData = !(isLoading || searchProjects.length === 0 || isError);

  // 페이징 관련
  const totalItems = data?.data.totalCount || DEFAULT_ITEMS_TOTAL_COUNT;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleClickPaginationItem = (page: number) => {
    setCurrentPage(page);
  };

  // "이전" 버튼
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // "다음" 버튼
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // 검색 조건이 다르거나 검색창 입력을 하며 store값이 바뀌면, currentPage도 0으로 초기화 시켜줘야한다.
  useEffect(() => {
    setCurrentPage(0);
  }, [searchCondition, setCurrentPage]);

  return (
    <>
      <div className="bg-white absolute h-56 w-full flex-center">
        <section className="w-full max-w-[1500px] flex-center">
          <ProjectSearchBar
            defaultKeyword={searchCondition.keyword}
            defaultCategories={searchCondition.categories}
            defaultDetailVisible
            mode={isDarkMode ? 'DARK' : 'LIGHT'}
          />
        </section>
      </div>
      <div className="container mx-auto mb-14 flex min-h-screen flex-col items-center gap-12 pt-60">
        <section className="flex w-full max-w-[1040px] flex-col gap-5">
          <h2 className="text-gray-900 body6">프로젝트 목록</h2>
          {!isValidData ? (
            <ValidInformation isLoading={isLoading} isError={isError} />
          ) : (
            <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              {searchProjects.map((projectData) => (
                <li key={projectData.projectId} className="w-full">
                  <SearchProjectCard projectData={projectData} />
                </li>
              ))}
            </ul>
          )}
        </section>
        <nav>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={cn(
                    currentPage === 0 &&
                      'cursor-not-allowed text-gray-300 hover:bg-gray-50 hover:text-gray-300',
                  )}
                  onClick={handlePrevious}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index} onClick={() => handleClickPaginationItem(index)}>
                  <PaginationLink isActive={currentPage === index}>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className={cn(
                    currentPage === totalPages - 1 &&
                      'cursor-not-allowed text-gray-300 hover:bg-gray-50 hover:text-gray-300',
                  )}
                  onClick={handleNext}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </nav>
      </div>
    </>
  );
}

// 로딩중, 오류, 데이터가 비었을 때 표시될 컴포넌트
const ValidInformation = ({ isLoading, isError }: { isLoading: boolean; isError: boolean }) => {
  const isEmpty = !(isLoading || isError);
  const message = isError
    ? '프로젝트를 검색하는 중 오류가 발생했습니다.'
    : '일치하는 검색 결과가 없습니다.';
  const subMessage = isError
    ? '다시 시도해주세요.'
    : '오타가 없는지 확인하거나, 다른 검색어를 사용해 보세요.';

  return (
    <section className="gap-7 flex-col-center">
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
          <ProjectRegisterButton />
        </div>
      )}
    </section>
  );
};
