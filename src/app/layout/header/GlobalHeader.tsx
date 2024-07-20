'use client';

import React from 'react';
import Link from 'next/link';
import LoginModal from '@/components/domain/auth/login/LoginModal';
import SignupModal from '@/components/domain/auth/signup/SignupModal';
import ProjectRegisterModal from '@/components/domain/project/projectRegisterModal/ProjectRegisterModal';
import PrismLogo from '@/assets/logo/logo-combine.svg';
import { useModalStore } from '@/stores/modalStore';
import { useAuthStore } from '@/stores/authStore';
import { useLogout } from '@/hooks/queries/useAuthService';
import { AlignJustify, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

const GlobalHeader = () => {
  const { openModal, closeModal } = useModalStore();
  const { isLoggedIn } = useAuthStore();
  const logoutMutation = useLogout();

  const handleSignupSuccess = () => {
    closeModal();
    setTimeout(() => {
      openModal(<LoginModal />);
    }, 200);
  };

  const handleOpenLoginModal = () => {
    openModal(<LoginModal />);
  };

  const handleOpenSignupModal = () => {
    openModal(<SignupModal onSuccess={handleSignupSuccess} />);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleOpenProject = () => {
    openModal(<ProjectRegisterModal />);
  };

  const renderAuthButtons = () => (
    <>
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
    </>
  );

  const renderMenuItem = (href: string, label: string, onClick?: () => void) => (
    <>
      {onClick ? (
        <MenubarItem className="cursor-pointer" onClick={onClick}>
          <span>{label}</span>
        </MenubarItem>
      ) : (
        <Link href={href} passHref legacyBehavior>
          <MenubarItem className="cursor-pointer">
            <span>{label}</span>
          </MenubarItem>
        </Link>
      )}
      <MenubarSeparator />
    </>
  );

  return (
    <Menubar className="flex h-[70px] w-full items-center justify-between bg-white px-4 py-4 shadow-custom-2px md:px-8 lg:px-24 lg:py-8">
      <Link href="/" className="flex items-center">
        <PrismLogo className="w-[150px]" />
      </Link>
      <div className="flex items-center">
        {isLoggedIn ? (
          <MenubarMenu>
            <MenubarTrigger className="ml-auto">
              <AlignJustify className="h-7 w-7" />
            </MenubarTrigger>
            <MenubarContent className="m-5">
              {renderMenuItem('/mypage', '마이페이지')}
              {renderMenuItem('', '새 프로젝트 등록', handleOpenProject)}
              {renderMenuItem('/project/manage', '프로젝트 관리')}
              <MenubarItem className="cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-[16px] w-[16px]" />
                <span>로그아웃</span>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        ) : (
          renderAuthButtons()
        )}
      </div>
    </Menubar>
  );
};

export default GlobalHeader;
