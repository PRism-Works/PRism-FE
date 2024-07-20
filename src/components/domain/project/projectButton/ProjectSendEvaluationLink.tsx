import { Button } from '@/components/ui/button';

interface ProjectSendEvaluationLinkProps {
  projectId: number;
}

export default function ProjectSendEvaluationLink({ projectId }: ProjectSendEvaluationLinkProps) {
  const handleSendEvaluationLink = () => {
    alert(`${projectId}번 프로젝트 평가 링크 보내기 api 호출, 후처리`);
  };

  return (
    <Button className="h-8 display5" variant="outline" onClick={handleSendEvaluationLink}>
      평가 링크 다시보내기
    </Button>
  );
}
