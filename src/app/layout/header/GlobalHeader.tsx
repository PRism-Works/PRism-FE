'use client';

import { useModalStore } from '@/stores/modalStore';
import { Button } from '@/components/ui/button';
import { AlignJustify, LogOut } from 'lucide-react';
import LoginModal from '@/components/domain/auth/login/LoginModal';
import SignupModal from '@/components/domain/auth/signup/SignupModal';
import PrismLogo from '@/assets/logo/logo-combine.svg';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

export default function GlobalHeader() {
  const { openModal, closeModal } = useModalStore();

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

  // NOTE: 로그인 여부에 따라 토글 조건부 렌더링 로직 추가 예정. 현재 스크린만 진행된 상태
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
      <MenubarMenu>
        <MenubarTrigger className="ml-auto">
          <AlignJustify className="h-7 w-7" />
        </MenubarTrigger>
        <MenubarContent className="m-5">
          <MenubarSeparator />
          <MenubarItem className="cursor-pointer">
            <span>마이페이지</span>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="cursor-pointer">
            <span>새 프로젝트 등록</span>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="cursor-pointer">
            <span>프로젝트 관리</span>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="cursor-pointer">
            <LogOut className="mr-2 h-[16px] w-[16px]" />
            <span>로그아웃</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
