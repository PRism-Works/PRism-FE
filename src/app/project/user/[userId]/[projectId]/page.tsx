// 다른 유저 프로필에서 넘어온 프로젝트 상세 조회 페이지
import RadialChartReport from '@/components/domain/prism/RadialChartReport';
import PRismChartExplanationReport from '@/components/domain/prism/PRismChartExplanationReport';
import ProjectIntroduceCard from '@/components/domain/project/projectCard/ProjectIntroduceCard';

interface UserProjectDetailPageProps {
  params: { userId: string; projectId: string };
}

export default function UserProjectDetailPage({ params }: UserProjectDetailPageProps) {
  const userId = params.userId;
  const projectId = Number(params.projectId);

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-12">
      <div className="flex w-full max-w-[1040px] flex-col gap-10">
        {/* 유저 프로필에서 넘어온 상세 조회, Project ID: {projectId} */}
        <ProjectIntroduceCard userId={userId} projectId={projectId} fromMyProfile={false} />
        <section className="flex flex-col gap-4">
          <h2 className="text-gray-900 body6">PRism</h2>
          <PRismChartExplanationReport
            fromMyProfile={false}
            projectId={projectId}
            reportedUserId={userId}
          />
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-gray-900 body6">PRism 분석 리포트</h2>
          <RadialChartReport projectId={projectId} reportedUserId={userId} fromMyProfile={false} />
        </section>
      </div>
    </div>
  );
}
