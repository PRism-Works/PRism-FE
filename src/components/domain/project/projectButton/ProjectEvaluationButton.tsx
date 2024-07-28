import { Button } from '@/components/ui/button';
import { useUpdatePRismEvaluation } from '@/hooks/queries/usePRismService';

interface ProjectEvaluationButtonProps {
  projectId: number;
}

export default function ProjectEvaluationButton({ projectId }: ProjectEvaluationButtonProps) {
  const handlePRismUpdateSuccess = () => {
    // 나중에 메시지박스 추가? 피그마에 내용 없어서 alert 처리함
    alert('PRism 분석이 갱신되었어요!');
  };
  const updatePRismMutation = useUpdatePRismEvaluation(handlePRismUpdateSuccess);

  const handleStartEvaluation = () => {
    updatePRismMutation.mutate(projectId);
  };

  return (
    <Button className="h-8 mobile2" onClick={handleStartEvaluation}>
      PRism 분석 시작
    </Button>
  );
}
