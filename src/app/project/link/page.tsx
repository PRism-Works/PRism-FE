'use client';

import SearchInput from '@/components/common/input/SearchInput';
import ProjectRegisterButton from '@/components/domain/project/projectButton/ProjectRegisterButton';
import LinkProjectList from '@/components/domain/project/projectList/LinkProjectList';
import useMessageBox from '@/hooks/useMessageBox';
import { useState } from 'react';

// 검색어 입력창이 포함되고, 검색어에 대한 의존성이 높은 페이지라 'use client' 선언했습니다.
export default function ProjectLinkPage() {
  const { showConfirmMessageBox } = useMessageBox();

  const [keyword, setKeyword] = useState<string>('');
  const handleSearch = (value: string) => {
    if (value === '') {
      // 검색어가 비어있으면 알림창을 띄운다
      showConfirmMessageBox('검색어를 입력해주세요.');
      return;
    }
    setKeyword(value);
  };
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-7">
      <div className="flex w-full max-w-[1040px] flex-col items-center gap-10">
        <section className="w-full max-w-[700px]">
          <SearchInput
            placeholder="연동할 프로젝트 명을 입력해 주세요."
            className="h-[52px] w-full body8"
            onSearch={handleSearch}
          />
        </section>
        <section className="flex w-full flex-col gap-4">
          <h2 className="text-gray-900 body6">연동할 프로젝트 검색 결과</h2>
          <LinkProjectList searchProjectName={keyword} />
        </section>
        <footer className="gap-4 flex-col-center">
          <p className="text-gray-600 mobile1">찾는 프로젝트가 없으신가요?</p>
          <ProjectRegisterButton text="새 프로젝트 등록하기" />
        </footer>
      </div>
    </div>
  );
}
