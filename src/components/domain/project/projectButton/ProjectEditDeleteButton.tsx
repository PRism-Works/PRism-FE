import MessageBox from '@/components/common/messgeBox/MessageBox';
import { useDeleteProject } from '@/hooks/queries/useProjectService';
import { useModalStore } from '@/stores/modalStore';
import { Edit3, Trash2 } from 'lucide-react';

interface ProjectEditDeleteButtonProps {
  projectId: number;
}

export default function ProjectEditDeleteButton({ projectId }: ProjectEditDeleteButtonProps) {
  const { openModal, closeModal } = useModalStore();

  const handleDeleteProject = () => {
    openModal(<DeleteConfirmMessage projectId={projectId} closeModal={closeModal} />);
  };
  const handleEditProject = () => {
    alert(`${projectId}번 프로젝트 수정 페이지 이동`);
  };
  return (
    <nav className="flex gap-3">
      <button aria-label="삭제" onClick={handleDeleteProject}>
        <Trash2 className="h-6 w-6 stroke-gray-600 stroke-[1.5px]" />
      </button>
      <button aria-label="편집" onClick={handleEditProject}>
        <Edit3 className="h-6 w-6 stroke-gray-600 stroke-[1.5px]" />
      </button>
    </nav>
  );
}

interface DeleteConfirmMessageProps {
  projectId: number;
  closeModal: () => void;
}
const DeleteConfirmMessage = ({ projectId, closeModal }: DeleteConfirmMessageProps) => {
  const handleProjectDeleteSuccess = () => {
    closeModal();
    alert('프로젝트가 정상적으로 삭제되었습니다.');
  };
  const deleteMuation = useDeleteProject(handleProjectDeleteSuccess);
  const handleCancle = () => {
    closeModal();
  };
  const handleDelete = () => {
    deleteMuation.mutate(projectId);
  };
  return (
    <MessageBox
      title="프로젝트를 삭제하시겠어요?"
      titleIcon={<Trash2 className="stroke-purple-500" />}
      footer={
        <>
          <MessageBox.MessageConfirmButton isPrimary={false} text="취소" onClick={handleCancle} />
          <MessageBox.MessageConfirmButton text="삭제" onClick={handleDelete} />
        </>
      }
    />
  );
};
