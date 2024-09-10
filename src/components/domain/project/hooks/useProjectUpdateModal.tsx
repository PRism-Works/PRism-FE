import ProjectRegisterModal from '../projectRegisterModal/ProjectRegisterModal';

import { useGetProjectDetails } from '@/hooks/queries/useProjectService';
import { useModalStore } from '@/stores/modalStore';

import type { ProjectForm } from '@/models/project/projectModels';

const useProjectUpdateModal = <T extends HTMLElement = HTMLElement>(projectId: number) => {
  const { openModal } = useModalStore();

  const handleGetDetailSuccess = (projectDetailData: ProjectForm) => {
    openModal(
      <ProjectRegisterModal isEdit projectId={projectId} defaultData={projectDetailData} />,
    );
  };

  const getDetailMutation = useGetProjectDetails(handleGetDetailSuccess);

  const handleOpenProjectUpdateModal = (event: React.MouseEvent<T>) => {
    event.stopPropagation();
    getDetailMutation.mutate(projectId);
  };

  return { handleOpenProjectUpdateModal, isDetailLoading: getDetailMutation.isPending };
};

export default useProjectUpdateModal;
