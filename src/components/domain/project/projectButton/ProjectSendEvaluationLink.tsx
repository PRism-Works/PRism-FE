import { useModalStore } from '@/stores/modalStore';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import MessageBox from '@/components/common/messgeBox/MessageBox';
import { useSendSurveyLink } from '@/hooks/queries/useSurveyService';

interface ProjectSendEvaluationLinkProps {
  projectId: number;
}

export default function ProjectSendEvaluationLink({ projectId }: ProjectSendEvaluationLinkProps) {
  const { openModal } = useModalStore();

  const sendSurveyLinkMutation = useSendSurveyLink();

  const handleSendEvaluationLink = async () => {
    try {
      await sendSurveyLinkMutation.mutateAsync({ projectId });
      openModal(<SendSurveyCompleteMessage />);
    } catch (error) {
      console.error('평가지 보내기 실패:', error);
    }
  };

  return (
    <Button className="h-8 display5" variant="outline" onClick={handleSendEvaluationLink}>
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
      titleIcon={<Send className="stroke-purple-500" />}
      footer={<MessageBox.MessageConfirmButton text="완료" onClick={handleClickComplete} />}
    />
  );
};
