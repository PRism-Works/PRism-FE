import LoginModal from './LoginModal';
import { useModalStore } from '@/stores/modalStore';

interface LoginButtonProps {
  children: React.ReactNode;
}
export default function LoginButton({ children }: LoginButtonProps) {
  const { openModal } = useModalStore();

  const handleOpenLoginModal = () => {
    openModal(<LoginModal />);
  };
  return <div onClick={handleOpenLoginModal}>{children}</div>;
}
