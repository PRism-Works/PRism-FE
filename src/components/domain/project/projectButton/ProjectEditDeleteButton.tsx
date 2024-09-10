import { Edit3, Trash2 } from 'lucide-react';

import { useModalStore } from '@/stores/modalStore';
import { useGetProjectDetails } from '@/hooks/queries/useProjectService';
import ProjectRegisterModal from '../projectRegisterModal/ProjectRegisterModal';
import { ProjectForm } from '@/models/project/projectModels';
import useConfirmDeleteProject from '../hooks/useConfirmDeleteProject';

interface ProjectEditDeleteButtonProps {
  projectId: number;
}

export default function ProjectEditDeleteButton({ projectId }: ProjectEditDeleteButtonProps) {
  const { openModal } = useModalStore();

  const handleGetDetailSuccess = (projectDetailData: ProjectForm) => {
    openModal(
      <ProjectRegisterModal isEdit projectId={projectId} defaultData={projectDetailData} />,
    );
  };
  const getDetailMutation = useGetProjectDetails(handleGetDetailSuccess);

  const { handleConfirmDeleteProject } = useConfirmDeleteProject<HTMLButtonElement>(projectId);

  const handleEditProject = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    getDetailMutation.mutate(projectId);
  };

  return (
    <nav className="flex gap-3">
      <button aria-label="삭제" onClick={handleConfirmDeleteProject}>
        <Trash2 className="stroke-gray-600 h-6 w-6 stroke-[1.5px] hover:stroke-gray-700 hover:stroke-[2px]" />
      </button>
      <button aria-label="편집" disabled={getDetailMutation.isPending} onClick={handleEditProject}>
        <Edit3 className="stroke-gray-600 h-6 w-6 stroke-[1.5px] hover:stroke-gray-700 hover:stroke-[2px]" />
      </button>
    </nav>
  );
}
