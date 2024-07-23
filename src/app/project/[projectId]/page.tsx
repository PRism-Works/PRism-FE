// 검색 결과에서 넘어온 프로젝트 상세 조회 페이지

interface SearchProjectDetailPageProps {
  params: { projectId: string };
}

export default function SearchProjectDetailPage({ params }: SearchProjectDetailPageProps) {
  const projectId = params.projectId;

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-12">
      <div className="w-full bg-gray-800">
        프로젝트 검색 결과에서 넘어온 상세 조회, Project ID: {projectId}
      </div>
    </div>
  );
}
