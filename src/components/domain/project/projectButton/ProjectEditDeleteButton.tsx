import { Edit3, Trash2 } from 'lucide-react';

interface ProjectEditDeleteButtonProps {
  projectId: number;
}

export default function ProjectEditDeleteButton({ projectId }: ProjectEditDeleteButtonProps) {
  const handleDeleteProject = () => {
    alert(`${projectId}번 프로젝트 삭제 api 호출`);
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
