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
import { useModalStore } from '@/stores/modalStore';
import LoginModal from '@/components/domain/auth/login/LoginModal';
import SignupModal from '@/components/domain/auth/signup/SignupModal';
import { User } from 'lucide-react';

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const modals = useModalStore((state) => state.modals);

  return (
    <>
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
                <LoginModal />
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <SignupModal />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </div>
        {children}
      </Menubar>
      {modals}
    </>
  );
}
