'use client';

import { Button } from '@/components/ui/button';
import { useModalStore } from '@/stores/modalStore';

import LoginModal from '@/components/domain/auth/login/LoginModal';
import SignupModal from '@/components/domain/auth/signup/SignupModal';

export default function BeforeLoginMenu() {
  const { openModal } = useModalStore();

  const handleOpenLoginModal = () => {
    openModal(<LoginModal />);
  };

  const handleOpenSignupModal = () => {
    openModal(<SignupModal />);
  };

  return (
    <>
      <Button
        onClick={handleOpenLoginModal}
        variant="outline"
        className="border-1 text-gray-700 mx-2 border border-gray-700">
        로그인
      </Button>
      <Button
        onClick={handleOpenSignupModal}
        variant="default"
        className="bg-purple-500 hover:bg-purple-600">
        회원가입
      </Button>
    </>
  );
}
