import { Button } from '@/components/ui/button';

interface ProjectEvaluationButtonProps {
  projectId: number;
}

export default function ProjectEvaluationButton({ projectId }: ProjectEvaluationButtonProps) {
  const handleStartEvaluation = () => {
    alert(`${projectId}번 프로젝트 프리즘 분석하기 api 호출, 후처리`);
  };

  return (
    <Button className="h-8 mobile2" onClick={handleStartEvaluation}>
      PRism 분석 시작
    </Button>
  );
}
