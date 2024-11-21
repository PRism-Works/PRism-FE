import { useRouter } from 'next/navigation';
import { useModalStore } from '@/stores/modalStore';
import useMessageBox from '@/hooks/useMessageBox';
import SendSurveyConfirmation from '../confirmation/SendSurveyConfirmation';

export default function useProjectMutationSuccess(isRecruit?: boolean) {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();
  const { showConfirmMessageBox } = useMessageBox();

  // 프로젝트 저장 성공 콜백함수
  const handleProjectCreateSuccess = (createdProjectId: number) => {
    closeModal();
    setTimeout(() => {
      openModal(<SendSurveyConfirmation projectId={createdProjectId} />);
    }, 150);
    if (isRecruit) {
      alert(`projectId: ${createdProjectId}, 팀 빌딩 작성 페이지로 이동, 임시로 홈으로 가게함`);
      router.push('/');
    }
  };

  // 프로젝트 수정 성공 콜백함수
  const handleProjectUpdateSuccess = (updateProjectId?: number) => {
    closeModal();
    showConfirmMessageBox('프로젝트가 수정되었습니다.');
    if (isRecruit && updateProjectId) {
      alert(`projectId: ${updateProjectId}, 팀 빌딩 작성 페이지로 이동, 임시로 홈으로 가게함`);
      router.push('/');
    }
  };

  return { handleProjectCreateSuccess, handleProjectUpdateSuccess };
}
