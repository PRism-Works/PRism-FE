import { Edit3, Trash2 } from 'lucide-react';
import MessageBox from '@/components/common/messgeBox/MessageBox';

import { useModalStore } from '@/stores/modalStore';
import { useDeleteProject } from '@/hooks/queries/useProjectService';
import ProjectRegisterModal from '../projectRegisterModal/ProjectRegisterModal';
import { ProjectForm } from '@/models/project/projectModels';

interface ProjectEditDeleteButtonProps {
  projectId: number;
}

export default function ProjectEditDeleteButton({ projectId }: ProjectEditDeleteButtonProps) {
  const { openModal, closeModal } = useModalStore();

  const handleDeleteProject = () => {
    openModal(<DeleteConfirmMessage projectId={projectId} closeModal={closeModal} />);
  };

  const handleEditProject = () => {
    // 현재 프로젝트 아이디에 해당하는 데이터 받아와서 props으로 넘겨주기
    const projectDefaultData: ProjectForm = {
      projectName: '프로젝트3',
      organizationName: '기관이름이름',
      startDate: new Date(),
      endDate: new Date(),
      members: [
        {
          name: '장세영23',
          email: 'jang.se.yeong000@gmail.com',
          roles: ['Frontend', 'Backend', 'Full Stack', 'Android'],
        },
        { name: '팀원2', email: '1@kakao.com', roles: ['Designer'] },
        { name: '팀원3', email: '222@naver.com', roles: ['Full Stack', 'Designer'] },
      ],
      projectUrlLink: 'https://google.com',
      projectDescription: '설명설명설명',
      skills: ['Spring Framework', 'AWS'],
      categories: ['헬스케어', '교육', '커머스'],
    };
    openModal(
      <ProjectRegisterModal isEdit projectId={projectId} defaultData={projectDefaultData} />,
    );
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
