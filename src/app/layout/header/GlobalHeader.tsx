'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LoginModal from '@/components/domain/auth/login/LoginModal';
import SignupModal from '@/components/domain/auth/signup/SignupModal';
import ProjectRegisterModal from '@/components/domain/project/projectRegisterModal/ProjectRegisterModal';
import PrismLogo from '@/assets/logo/logo.svg';
import PrismLogoDark from '@/assets/logo/logo-darkmode.svg';
import useIsDarkMode from '@/hooks/useIsDarkMode';
import { useModalStore } from '@/stores/modalStore';
import { useAuthStore } from '@/stores/authStore';
import { useLogout } from '@/hooks/queries/useAuthService';
import { useToast } from '@/hooks/useToast';
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
import { ModeToggle } from '@/components/common/theme/ModeToggle';
import { PageSpinner } from '@/components/common/spinner';

export default function GlobalHeader() {
  const { openModal } = useModalStore();
  const { toast } = useToast();

  const { isLoggedIn } = useAuthStore();
  const logoutMutation = useLogout();

  const [mounted, setMounted] = useState(false);
  const [isInitialDarkMode, setIsInitialDarkMode] = useState(false);
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    setMounted(true);
    setIsInitialDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  const handleOpenLoginModal = () => {
    openModal(<LoginModal />);
  };

  const handleOpenSignupModal = () => {
    openModal(<SignupModal />);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleOpenProject = () => {
    openModal(<ProjectRegisterModal />);
  };

  const handleOpenToast = () => {
    toast({
      title: '아직 개발 중인 기능입니다.',
      description: '조금만 기다려주세요!',
    });
  };

  const renderAuthButtons = () => (
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

  const renderMenuItem = (href: string, label: string, onClick?: () => void) => (
    <>
      {onClick ? (
        <MenubarItem className="cursor-pointer display4" onClick={onClick}>
          <span>{label}</span>
        </MenubarItem>
      ) : (
        <Link href={href} passHref legacyBehavior>
          <MenubarItem className="cursor-pointer display4">
            <span>{label}</span>
          </MenubarItem>
        </Link>
      )}
      <MenubarSeparator />
    </>
  );

  const Logo = mounted
    ? isDarkMode
      ? PrismLogoDark
      : PrismLogo
    : isInitialDarkMode
      ? PrismLogoDark
      : PrismLogo;

  return (
    <Menubar className="bg-white flex h-[70px] w-full items-center justify-between px-4 py-4 shadow-custom-2px md:px-8 lg:px-24 lg:py-8">
      <Link href="/" className="flex items-center">
        <Logo className="w-[150px]" />
      </Link>
      <div className="flex items-center">
        <ModeToggle />
        {isLoggedIn ? (
          <MenubarMenu>
            <MenubarTrigger className="ml-2">
              <AlignJustify className="h-7 w-7" />
            </MenubarTrigger>
            <MenubarContent className="m-5">
              {renderMenuItem('/mypage', '마이페이지')}
              {renderMenuItem('', '새 프로젝트 등록', handleOpenProject)}
              {renderMenuItem('/project/manage', '프로젝트 관리')}
              {renderMenuItem('', '팀 빌딩하기', handleOpenToast)}
              <MenubarItem className="cursor-pointer display4" onClick={handleLogout}>
                <LogOut className="mr-2 h-[16px] w-[16px]" />
                <span>로그아웃</span>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        ) : (
          renderAuthButtons()
        )}
      </div>
      {logoutMutation.isPending && <PageSpinner />}
    </Menubar>
  );
}
