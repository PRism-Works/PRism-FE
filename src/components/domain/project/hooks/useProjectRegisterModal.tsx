import { useModalStore } from '@/stores/modalStore';
import { useAuthStore } from '@/stores/authStore';

import LoginModal from '../../auth/login/LoginModal';
import ProjectRegisterModal from '@/components/domain/project/projectRegisterModal/ProjectRegisterModal';

const useProjectRegisterModal = () => {
  const openModal = useModalStore((state) => state.openModal);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleOpenProjectRegisterModal = () => {
    if (!isLoggedIn) {
      openModal(<LoginModal />);
      return;
    }
    openModal(<ProjectRegisterModal />);
  };

  return { handleOpenProjectRegisterModal };
};

export default useProjectRegisterModal;
