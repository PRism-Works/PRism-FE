// 마이 프로필에서 넘어온 프로젝트 상세 조회 페이지
import RadialChartReport from '@/components/domain/prism/RadialChartReport';
import PRismChartExplanationReport from '@/components/domain/prism/PRismChartExplanationReport';
import ProjectIntroduceCard from '@/components/domain/project/projectCard/ProjectIntroduceCard';

interface MyProjectDetailPageProps {
  params: { projectId: string };
}

export default function MyProjectDetailPage({ params }: MyProjectDetailPageProps) {
  const projectId = Number(params.projectId);

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-12">
      <div className="flex w-full max-w-[1040px] flex-col gap-10">
        {/* 마이프로필에서 넘어온 상세 조회, Project ID: {projectId} */}
        <ProjectIntroduceCard fromMyProfile projectId={projectId} />
        <section className="flex flex-col gap-4">
          <h2 className="text-gray-900 body6">나의 PRism</h2>
          <PRismChartExplanationReport fromMyProfile />
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-gray-900 body6">나의 PRism 분석 리포트</h2>
          <RadialChartReport fromMyProfile />
        </section>
      </div>
    </div>
  );
}
