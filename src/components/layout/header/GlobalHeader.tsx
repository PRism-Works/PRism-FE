'use client';

import Link from 'next/link';

import { Menubar } from '@/components/ui/menubar';

import ThemeModeToggle from '@/components/common/theme/ThemeModeToggle';

import { useAuthStore } from '@/stores/authStore';

import PRismLogo from './PRismLogo';
import AfterLoginMenu from './AfterLoginMenu';
import BeforeLoginMenu from './BeforeLoginMenu';

export default function GlobalHeader() {
  const { isLoggedIn } = useAuthStore();

  return (
    <Menubar className="bg-white flex h-[70px] w-full items-center justify-between px-4 py-4 shadow-custom-2px md:px-8 lg:px-24 lg:py-8">
      <Link href="/" className="flex items-center">
        <PRismLogo />
      </Link>
      <div className="flex items-center">
        <ThemeModeToggle />
        {isLoggedIn ? <AfterLoginMenu /> : <BeforeLoginMenu />}
      </div>
    </Menubar>
  );
}
