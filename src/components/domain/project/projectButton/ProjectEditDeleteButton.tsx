import { Edit3, Trash2 } from 'lucide-react';
import MessageBox from '@/components/common/messgeBox/MessageBox';

import { useModalStore } from '@/stores/modalStore';
import { useDeleteProject, useGetProjectDetails } from '@/hooks/queries/useProjectService';
import ProjectRegisterModal from '../projectRegisterModal/ProjectRegisterModal';
import { ProjectForm } from '@/models/project/projectModels';

interface ProjectEditDeleteButtonProps {
  projectId: number;
}

export default function ProjectEditDeleteButton({ projectId }: ProjectEditDeleteButtonProps) {
  const { openModal, closeModal } = useModalStore();

  const handleGetDetailSuccess = (projectDetailData: ProjectForm) => {
    openModal(
      <ProjectRegisterModal isEdit projectId={projectId} defaultData={projectDetailData} />,
    );
  };
  const getDetailMutation = useGetProjectDetails(handleGetDetailSuccess);

  const handleDeleteProject = () => {
    openModal(<DeleteConfirmMessage projectId={projectId} closeModal={closeModal} />);
  };

  const handleEditProject = () => {
    getDetailMutation.mutate(projectId);
  };

  return (
    <nav className="flex gap-3">
      <button aria-label="삭제" onClick={handleDeleteProject}>
        <Trash2 className="h-6 w-6 stroke-gray-600 stroke-[1.5px] hover:stroke-gray-700 hover:stroke-[2px]" />
      </button>
      <button aria-label="편집" disabled={getDetailMutation.isPending} onClick={handleEditProject}>
        <Edit3 className="h-6 w-6 stroke-gray-600 stroke-[1.5px] hover:stroke-gray-700 hover:stroke-[2px]" />
      </button>
    </nav>
  );
}

interface DeleteConfirmMessageProps {
  projectId: number;
  closeModal: () => void;
}
const DeleteConfirmMessage = ({ projectId, closeModal }: DeleteConfirmMessageProps) => {
  const handleDeleteProjectSuccess = () => {
    closeModal();
    alert('프로젝트가 정상적으로 삭제되었습니다.');
  };
  const deleteMutaion = useDeleteProject(handleDeleteProjectSuccess);
  const handleCancel = () => {
    closeModal();
  };
  const handleDelete = () => {
    deleteMutaion.mutate(projectId);
  };
  return (
    <MessageBox
      title="프로젝트를 삭제하시겠어요?"
      titleIcon={<Trash2 className="stroke-purple-500" />}
      footer={
        <>
          <MessageBox.MessageConfirmButton isPrimary={false} text="취소" onClick={handleCancel} />
          <MessageBox.MessageConfirmButton
            text="삭제"
            onClick={handleDelete}
            isPending={deleteMutaion.isPending}
          />
        </>
      }
    />
  );
};
