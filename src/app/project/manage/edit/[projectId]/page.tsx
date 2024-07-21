'use client';

// 등록 프로젝트 수정 페이지

import BorderCard from '@/components/common/card/BorderCard';

interface ProjectEditPageProps {
  params: { projectId: string };
}

export default function ProjectEditPage({ params }: ProjectEditPageProps) {
  const projectId = params.projectId;

  // Fetch 사용하여 데이터 가져오기

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-5">
      <article className="flex w-full max-w-[1040px] flex-col gap-4 bg-pink-300">
        <h1 className="text-gray-900 body6">프로젝트 수정</h1>
        <BorderCard className="w-full max-w-[1040px] px-[100px] py-6 flex-col-center">
          <div className="w-full bg-red-200">프로젝트 수정, Project ID: {projectId}</div>
          <div className="w-full bg-red-200">프로젝트 수정, Project ID: {projectId}</div>
          <div className="w-full bg-red-200">프로젝트 수정, Project ID: {projectId}</div>
        </BorderCard>
      </article>
    </div>
  );
}
