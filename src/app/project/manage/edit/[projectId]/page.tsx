// 등록 프로젝트 수정 페이지

interface ProjectEditPageProps {
  params: { projectId: string };
}

export default function ProjectEditPage({ params }: ProjectEditPageProps) {
  const projectId = params.projectId;

  // Fetch 사용하여 데이터 가져오기

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-12">
      <div className="w-full bg-gray-800">프로젝트 수정, Project ID: {projectId}</div>
    </div>
  );
}
