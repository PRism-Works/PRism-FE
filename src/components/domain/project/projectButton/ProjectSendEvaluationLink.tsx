import { useModalStore } from '@/stores/modalStore';
import { sendSurveyLink } from '@/services/api/surveyApi';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import MessageBox from '@/components/common/messgeBox/MessageBox';

interface ProjectSendEvaluationLinkProps {
  projectId: number;
}

export default function ProjectSendEvaluationLink({ projectId }: ProjectSendEvaluationLinkProps) {
  const { openModal } = useModalStore();

  const handleSendEvaluationLink = async () => {
    try {
      await sendSurveyLink({ projectId });
      openModal(<SendSurveyCompleteMessage />);
    } catch (error) {
      alert('평가 링크 전송에 실패했습니다.');
      console.error(error);
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
