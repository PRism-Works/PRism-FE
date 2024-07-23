// 타인 프로필에서 넘어온 프로젝트 상세 조회 페이지

interface UserProjectDetailPageProps {
  params: {
    userId: string;
    projectId: string;
  };
}

export default function UserProjectDetailPage({
  params: { userId, projectId },
}: UserProjectDetailPageProps) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-12">
      <div className="w-full bg-pink-400">
        타인 프로필에서 넘어온 상세 조회, UserId: {userId} / Project ID: {projectId}
      </div>
    </div>
  );
}
