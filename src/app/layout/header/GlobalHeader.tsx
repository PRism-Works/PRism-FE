'use client';

import React from 'react';
import { useModalStore } from '@/stores/modalStore';
import { Menubar } from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import LoginModal from '@/components/domain/auth/login/LoginModal';
import SignupModal from '@/components/domain/auth/signup/SignupModal';
import PrismLogo from '@/assets/logo/logo-combine.svg';

export default function GlobalHeader() {
  const openModal = useModalStore((state) => state.openModal);

  const handleOpenLoginModal = () => {
    openModal(<LoginModal />);
  };

  const handleOpenSignupModal = () => {
    openModal(<SignupModal />);
  };

  return (
    <Menubar className="flex h-[70px] w-full items-center justify-between bg-white px-24 py-8 shadow-custom-2px">
      <div className="flex items-center">
        <PrismLogo className="w-[150px]" />
      </div>
      <div className="flex items-center">
        <Button
          onClick={handleOpenLoginModal}
          variant="outline"
          className="border-1 mr-2 border border-gray-700 text-gray-700">
          로그인
        </Button>
        <Button
          onClick={handleOpenSignupModal}
          variant="default"
          className="bg-purple-500 hover:bg-purple-600">
          회원가입
        </Button>
      </div>
    </Menubar>
  );
}
