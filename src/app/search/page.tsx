'use client';

import { useEffect, useState } from 'react';
import ProjectSummaryCard from '@/components/domain/project/projectCard/ProjectSummaryCard';
import ProjectSearchBar from '@/components/domain/project/projectSearch/ProjectSearchBar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { convertStringToDate } from '@/lib/dateTime';
import { useSearchStore } from '@/stores/searchStore';

export default function SearchPage() {
  const searchCondition = useSearchStore((state) => state.searchCondition);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = 30; // 총 프로젝트가 30개라고 가정
  const itemsPerPage = 8; // 한 페이지에 8개씩 보여줌
  const totalPages = Math.ceil(totalItems / itemsPerPage); // 4

  const handleClickPaginationItem = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!(searchCondition.keyword === '' && searchCondition.categories.length === 0)) {
      alert(JSON.stringify(searchCondition));
    }
  }, [searchCondition]);

  return (
    <>
      <div className="absolute h-56 w-full bg-white flex-center">
        <section className="w-full max-w-[1500px] flex-center">
          <ProjectSearchBar
            // 검색 페이지에서 페이지 새로고침 시, zustand에서 persist 값을 다시 세팅해주는데, 그 값 인지를 못해서 새로운 인스턴스로 생성하며 강제 렌더링 하게 함.
            key={JSON.stringify(searchCondition)}
            defualtKeyword={searchCondition.keyword}
            defaultCategories={searchCondition.categories}
            defaultDetailVisible
          />
        </section>
      </div>
      <div className="container mx-auto mb-14 flex min-h-screen flex-col items-center gap-16 pt-60">
        <section className="flex w-full max-w-[1040px] flex-col gap-5">
          <h2 className="text-gray-900 body6">프로젝트 목록</h2>
          <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {testData.map((projectData) => (
              <li key={projectData.projectId} className="w-full">
                <ProjectSummaryCard projectData={projectData} />
              </li>
            ))}
          </ul>
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

const testData = [
  {
    projectId: 1,
    projectname: 'project.projectName1',
    startDate: convertStringToDate('2024-02-02'),
    endDate: convertStringToDate('2024-05-02'),
    organizationName: 'project.organizationName',
    categories: ['기타', '금융', '생산성'],
    evaluatedMembersCount: 0,
  },
  {
    projectId: 2,
    projectname: 'project.proj4ectName2',
    startDate: convertStringToDate('2024-02-02'),
    endDate: convertStringToDate('2024-05-02'),
    organizationName: 'project.organizationName',
    categories: ['기타', '금융', '생산성'],
    evaluatedMembersCount: 0,
  },
  {
    projectId: 3,
    projectname: 'project.project1Name',
    startDate: convertStringToDate('2024-02-02'),
    endDate: convertStringToDate('2024-05-02'),
    organizationName: 'project.organizationName',
    categories: ['기타', '금융', '생산성'],
    evaluatedMembersCount: 0,
  },
  {
    projectId: 5,
    projectname: 'project.projectName3',
    startDate: convertStringToDate('2024-02-02'),
    endDate: convertStringToDate('2024-05-02'),
    organizationName: 'project.organizationName',
    categories: ['기타', '금융', '생산성'],
    evaluatedMembersCount: 0,
  },
  {
    projectId: 6,
    projectname: 'project.projectName3',
    startDate: convertStringToDate('2024-02-02'),
    endDate: convertStringToDate('2024-05-02'),
    organizationName: 'project.organizationName',
    categories: ['기타', '금융', '생산성'],
    evaluatedMembersCount: 0,
  },
  {
    projectId: 7,
    projectname: 'project.projectName3',
    startDate: convertStringToDate('2024-02-02'),
    endDate: convertStringToDate('2024-05-02'),
    organizationName: 'project.organizationName',
    categories: ['기타', '금융', '생산성'],
    evaluatedMembersCount: 0,
  },
  {
    projectId: 8,
    projectname: 'project.projectName3',
    startDate: convertStringToDate('2024-02-02'),
    endDate: convertStringToDate('2024-05-02'),
    organizationName: 'project.organizationName',
    categories: ['기타', '금융', '생산성'],
    evaluatedMembersCount: 0,
  },
];
