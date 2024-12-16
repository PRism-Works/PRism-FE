import ProjectRegisterModal from '../projectRegisterModal/ProjectRegisterModal';

import { useGetProjectDetails } from '@/hooks/queries/useProjectService';
import { useModalStore } from '@/stores/modalStore';

import type { ProjectForm } from '@/models/project/projectModels';

const useProjectUpdateModal = (projectId: number, isRecruit?: boolean) => {
  const { openModal } = useModalStore();

  const handleGetDetailSuccess = (projectDetailData: ProjectForm) => {
    openModal(
      <ProjectRegisterModal
        isEdit
        isRecruit={isRecruit}
        projectId={projectId}
        defaultData={projectDetailData}
      />,
    );
  };

  const getDetailMutation = useGetProjectDetails(handleGetDetailSuccess);

  const handleOpenProjectUpdateModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    getDetailMutation.mutate(projectId);
  };

  return { handleOpenProjectUpdateModal, isDetailLoading: getDetailMutation.isPending };
};

export default useProjectUpdateModal;
