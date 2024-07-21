// 프로젝트 상세 조회 페이지
// 내꺼인지 아닌지는 userId로 판단

interface ProjectDetailPageProps {
  params: { projectId: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const projectId = params.projectId;

  // Fetch 사용하여 데이터 가져오기

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-12">
      <div className="w-full bg-gray-800">프로젝트 상세 조회, Project ID: {projectId}</div>
    </main>
  );
}
