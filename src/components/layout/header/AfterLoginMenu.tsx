'use client';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';

import { AlignJustify, LogOut } from 'lucide-react';
import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

import RecruitModal from '@/components/domain/recruit/recruitModal/RecruitModal';
import ProjectRegisterModal from '@/components/domain/project/projectRegisterModal/ProjectRegisterModal';

import { useModalStore } from '@/stores/modalStore';
import LogoutButton from '@/components/domain/auth/logout/LogoutButton';

type MenuItem =
  | { label: string; href: string; onClick: null }
  | { label: string; href: null; onClick: () => void };

export default function AfterLoginMenu() {
  const { openModal } = useModalStore();

  const handleOpenProject = useCallback(() => {
    openModal(<ProjectRegisterModal />);
  }, [openModal]);

  const handleOpenRecruit = useCallback(() => {
    openModal(<RecruitModal />);
  }, [openModal]);

  const menuItems: MenuItem[] = useMemo(() => {
    return [
      { label: '마이페이지', href: '/mypage', onClick: null },
      { label: '새 프로젝트 등록', href: null, onClick: handleOpenProject },
      { label: '프로젝트 관리', href: '/project/manage', onClick: null },
      { label: '팀 빌딩하기', href: null, onClick: handleOpenRecruit },
    ];
  }, [handleOpenProject, handleOpenRecruit]);

  return (
    <MenubarMenu>
      <MenubarTrigger className="ml-2">
        <AlignJustify className="h-7 w-7" />
      </MenubarTrigger>
      <MenubarContent className="m-5">
        {menuItems.map((item) =>
          item.href ? (
            <Link href={item.href} key={item.label}>
              <AfterLoginMenuItem label={item.label} />
            </Link>
          ) : (
            <AfterLoginMenuItem
              key={item.label}
              label={item.label}
              onClick={item.onClick || undefined}
            />
          ),
        )}
        <LogoutButton>
          <MenubarItem className="cursor-pointer display4">
            <LogOut className="mr-2 h-[16px] w-[16px]" />
            <span>로그아웃</span>
          </MenubarItem>
        </LogoutButton>
      </MenubarContent>
    </MenubarMenu>
  );
}

interface AfterLoginMenuItemProps {
  label: string;
  onClick?: () => void;
}
const AfterLoginMenuItem = ({ label, onClick }: AfterLoginMenuItemProps) => {
  return (
    <MenubarItem className="cursor-pointer display4" onClick={onClick}>
      <span>{label}</span>
    </MenubarItem>
  );
};
