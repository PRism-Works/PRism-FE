import { useUserStore } from '@/stores/userStore';
import PRismChartExplanationReport from '../prism/PRismChartExplanationReport';
import RadialChartReport from '../prism/RadialChartReport';
import ProjectIntroduceCard from '../project/projectCard/ProjectIntroduceCard';

interface ProjectPreviewContentProps {
  projectId: number;
}

export default function ProjectPreviewContent({ projectId }: ProjectPreviewContentProps) {
  const userId = useUserStore((state) => state.user?.userId);
  return (
    <>
      <section>
        <ProjectIntroduceCard
          forSaveImage
          userId={userId}
          projectId={projectId}
          fromMyProfile={false}
        />
      </section>
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
    </>
  );
}
