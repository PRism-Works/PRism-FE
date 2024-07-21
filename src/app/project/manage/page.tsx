import ProjectRegisterButton from '@/components/domain/project/projectButton/ProjectRegisterButton';
import RegisteredProjectList from '@/components/domain/project/projectList/RegisteredProjectList';

// 등록 프로젝트 수정 페이지
export default function ProjectManagePage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-5">
      <div className="flex w-full max-w-[1040px] flex-col items-end">
        <ProjectRegisterButton text="새 프로젝트 등록하기" />
        <section className="flex w-full flex-col gap-4">
          <h2 className="text-gray-900 body6">내가 등록한 프로젝트</h2>
          <RegisteredProjectList />
        </section>
      </div>
    </main>
  );
}
