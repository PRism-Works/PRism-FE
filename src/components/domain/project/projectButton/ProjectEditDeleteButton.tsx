import { Edit3, Trash2 } from 'lucide-react';

import useProjectUpdateModal from '../hooks/useProjectUpdateModal';
import useConfirmDeleteProject from '../hooks/useConfirmDeleteProject';

interface ProjectEditDeleteButtonProps {
  projectId: number;
}

export default function ProjectEditDeleteButton({ projectId }: ProjectEditDeleteButtonProps) {
  const { handleOpenProjectUpdateModal, isDetailLoading } =
    useProjectUpdateModal<HTMLButtonElement>(projectId);
  const { handleConfirmDeleteProject } = useConfirmDeleteProject<HTMLButtonElement>(projectId);

  return (
    <nav className="flex gap-3">
      <button aria-label="편집" disabled={isDetailLoading} onClick={handleOpenProjectUpdateModal}>
        <Edit3 className="stroke-gray-600 h-6 w-6 stroke-[1.5px] hover:stroke-gray-700 hover:stroke-[2px]" />
      </button>
      <button aria-label="삭제" onClick={handleConfirmDeleteProject}>
        <Trash2 className="stroke-gray-600 h-6 w-6 stroke-[1.5px] hover:stroke-gray-700 hover:stroke-[2px]" />
      </button>
    </nav>
  );
}
