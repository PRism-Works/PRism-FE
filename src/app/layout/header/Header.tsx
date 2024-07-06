'use client';

import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LoginModal from '@/components/domain/auth/login/LoginModal';
import SignupModal from '@/components/domain/auth/signup/SignupModal';
import { User } from 'lucide-react';
import { useModalStore } from '@/stores/modalStore';
import ProjectRegisterModal from '@/components/domain/project/projectRegister/ProjectRegisterModal';

export default function Header() {
  const openModal = useModalStore((state) => state.openModal);

  const handleOpenLogin = () => {
    openModal(<LoginModal />);
  };

  const handleOpenSignUp = () => {
    openModal(<SignupModal />);
  };

  const handleOpenProject = () => {
    openModal(<ProjectRegisterModal />);
  };

  return (
    <Menubar className="bg-gray-300 p-8">
      <div className="flex w-full items-center">
        <MenubarMenu>
          <MenubarTrigger className="ml-auto">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent className="m-4">
            <MenubarSeparator />
            <MenubarItem>
              <span onClick={handleOpenLogin}>로그인</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <span onClick={handleOpenSignUp}>회원가입</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <span onClick={handleOpenProject}>프로젝트 등록</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>
  );
}
