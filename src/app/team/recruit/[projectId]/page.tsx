import { TeamRecruitForm } from '@/components/domain/team/recruit/TeamRecruitForm';

interface TeamRecruitPageProps {
  params: {
    projectId: string;
  };
}

// NOTE: 추후 API 연동 시 권한 체크 로직 추가
export default function TeamRecruitPage({ params: { projectId } }: TeamRecruitPageProps) {
  return <TeamRecruitForm projectId={projectId} />;
}
