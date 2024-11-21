import SignupModal from './SignupModal';
import { useModalStore } from '@/stores/modalStore';

interface SignupButtonProps {
  children: React.ReactNode;
}
export default function SignupButton({ children }: SignupButtonProps) {
  const { openModal } = useModalStore();

  const handleOpenSignupModal = () => {
    openModal(<SignupModal />);
  };
  return <div onClick={handleOpenSignupModal}>{children}</div>;
}
