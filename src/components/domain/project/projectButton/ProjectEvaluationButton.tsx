import { useModalStore } from '@/stores/modalStore';
import { useUpdatePRismEvaluation } from '@/hooks/queries/usePRismService';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MessageBox from '@/components/common/messgeBox/MessageBox';
import PRismAnalyzeAnimation from '../../prism/PRismAnalyzeAnimation';

interface ProjectEvaluationButtonProps {
  projectId: number;
}

export default function ProjectEvaluationButton({ projectId }: ProjectEvaluationButtonProps) {
  const { openModal, closeModal } = useModalStore();

  const updatePRismMutation = useUpdatePRismEvaluation();

  const handleStartEvaluation = async () => {
    try {
      openModal(<PRismAnalyzeAnimation />);
      await updatePRismMutation.mutateAsync(projectId);
      // 성공 시, 모달을 닫고 성공 메시지창 띄우기
      closeModal();
      openModal(<SuccessMessage />);
    } catch (error) {
      // 실패 시, 문구 띄우기
      closeModal();
      let errorMessage: string;
      if (typeof error === 'string') {
        errorMessage = error;
      } else {
        errorMessage = 'PRism 분석 업데이트에 실패했습니다.';
      }
      openModal(<ErrorMessage message={errorMessage} />);
    }
  };

  return (
    <Button className="h-8 mobile2" onClick={handleStartEvaluation}>
      PRism 분석 시작
    </Button>
  );
}

// 갱신 실패 메시지창
const ErrorMessage = ({ message }: { message: string }) => {
  const { closeModal } = useModalStore();

  return (
    <MessageBox
      title={<div className="my-1 body6">{message}</div>}
      titleIcon={<AlertTriangle className="h-6 w-6 stroke-danger-500" />}
      footer={<MessageBox.MessageConfirmButton text="확인" onClick={closeModal} isPrimary />}
    />
  );
};

// 갱신 성공 메시지창
const SuccessMessage = () => {
  const { closeModal } = useModalStore();

  return (
    <MessageBox
      title={<div className="my-2 body6">PRism 분석이 갱신되었어요!</div>}
      titleIcon={<CheckCircle className="h-7 w-7 stroke-purple-500" />}
      footer={<MessageBox.MessageConfirmButton text="확인" onClick={closeModal} isPrimary />}
    />
  );
};
