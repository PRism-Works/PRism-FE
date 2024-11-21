import { Trash2 } from 'lucide-react';

import MessageBox from '@/components/common/messageBox/MessageBox';

import { useModalStore } from '@/stores/modalStore';
import { useDeleteProject } from '@/hooks/queries/useProjectService';

const useConfirmDeleteProject = (projectId: number) => {
  const { openModal } = useModalStore();

  const handleConfirmDeleteProject = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    openModal(<ConfirmDeleteMessage projectId={projectId} />);
  };
  return { handleConfirmDeleteProject };
};

export default useConfirmDeleteProject;

interface ConfirmDeleteMessageProps {
  projectId: number;
}
const ConfirmDeleteMessage = ({ projectId }: ConfirmDeleteMessageProps) => {
  const deleteMutation = useDeleteProject(true);

  const handleDelete = () => {
    deleteMutation.mutate(projectId);
  };
  return (
    <MessageBox
      title="프로젝트를 삭제하시겠어요?"
      titleIcon={<Trash2 className="stroke-purple-500" />}
      footer={
        <>
          <MessageBox.MessageConfirmButton isPrimary={false} text="취소" />
          <MessageBox.MessageConfirmButton
            text="삭제"
            onClick={handleDelete}
            isPending={deleteMutation.isPending}
          />
        </>
      }
    />
  );
};
