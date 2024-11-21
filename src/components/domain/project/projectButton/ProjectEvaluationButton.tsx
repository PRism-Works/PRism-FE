import { Button } from '@/components/ui/button';
import usePRismEvaluation from './hooks/usePRismEvaluation';

interface ProjectEvaluationButtonProps {
  projectId: number;
}

export default function ProjectEvaluationButton({ projectId }: ProjectEvaluationButtonProps) {
  const { handleStartEvaluation } = usePRismEvaluation(projectId);

  return (
    <Button className="h-8 mobile2" onClick={handleStartEvaluation}>
      PRism 분석 시작
    </Button>
  );
}
