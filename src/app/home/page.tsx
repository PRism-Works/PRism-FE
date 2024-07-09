'use client';

import ProjectRegisterButton from '@/components/domain/project/projectRegister/ProjectRegisterButton';
import ProjectSearchBar from '@/components/domain/project/projectSearch/ProjectSearchBar';

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <ProjectRegisterButton className="mb-[140px] mr-[150px] mt-[445px] flex justify-end" />
      <div className="flex w-full justify-center">
        <ProjectSearchBar className="w-full max-w-[690px]" />
      </div>
    </div>
  );
}
