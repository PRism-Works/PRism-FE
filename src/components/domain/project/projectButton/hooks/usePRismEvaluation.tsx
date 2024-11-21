import { CheckCircle } from 'lucide-react';

import MessageBox from '@/components/common/messageBox/MessageBox';
import PRismAnalyzeAnimation from '@/components/domain/prism/PRismAnalyzeAnimation';

import useMessageBox from '@/hooks/useMessageBox';
import { useModalStore } from '@/stores/modalStore';
import { useUpdatePRismEvaluation } from '@/hooks/queries/usePRismService';

export default function usePRismEvaluation(projectId: number) {
  const { openModal, closeModal } = useModalStore();
  const { showErrorMessageBox } = useMessageBox();

  const updatePRismMutation = useUpdatePRismEvaluation();

  const handleStartEvaluation = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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
      showErrorMessageBox(errorMessage);
    }
  };

  return { handleStartEvaluation };
}

// 갱신 성공 메시지창
const SuccessMessage = () => {
  return (
    <MessageBox
      title={<div className="my-2 body6">PRism 분석이 갱신되었어요!</div>}
      titleIcon={<CheckCircle className="h-7 w-7 stroke-purple-500" />}
      footer={<MessageBox.MessageConfirmButton text="확인" isPrimary />}
    />
  );
};
