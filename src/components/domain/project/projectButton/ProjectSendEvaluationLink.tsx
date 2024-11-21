import { useModalStore } from '@/stores/modalStore';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import MessageBox from '@/components/common/messageBox/MessageBox';
import { useSendSurveyLink } from '@/hooks/queries/useSurveyService';

interface ProjectSendEvaluationLinkProps {
  projectId: number;
}

export default function ProjectSendEvaluationLink({ projectId }: ProjectSendEvaluationLinkProps) {
  const { openModal } = useModalStore();

  const sendSurveyLinkMutation = useSendSurveyLink();

  const handleSendEvaluationLink = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    openModal(<SendSurveyCompleteMessage />);

    try {
      await sendSurveyLinkMutation.mutateAsync({ projectId });
    } catch (error) {
      console.error('평가지 보내기 실패:', error);
    }
  };

  return (
    <Button
      className="h-8 display5"
      variant="outline"
      onClick={handleSendEvaluationLink}
      disabled={sendSurveyLinkMutation.isPending}
      pending={sendSurveyLinkMutation.isPending}>
      평가 링크 다시보내기
    </Button>
  );
}

const SendSurveyCompleteMessage = () => {
  const closeModal = useModalStore((state) => state.closeModal);

  const handleClickComplete = () => {
    closeModal();
  };

  const renderTitle = () => {
    return (
      <div className="flex-col-center">
        <span>팀원들의 이메일로</span>
        <span>평가지가 전송되었어요!</span>
      </div>
    );
  };
  return (
    <MessageBox
      title={renderTitle()}
      description="이메일 전송에는 최대 1분이 소요될 수 있습니다."
      titleIcon={<Send className="stroke-purple-500" />}
      footer={<MessageBox.MessageConfirmButton text="완료" onClick={handleClickComplete} />}
    />
  );
};
