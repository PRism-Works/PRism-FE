'use client';

import { useEffect, useState } from 'react';

import PrismLogo from '@/assets/logo/logo.svg';
import PrismLogoDark from '@/assets/logo/logo-darkmode.svg';
import useIsDarkMode from '@/hooks/useIsDarkMode';

export default function PRismLogo() {
  const [mounted, setMounted] = useState(false);
  const [isInitialDarkMode, setIsInitialDarkMode] = useState(false);
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    setMounted(true);
    setIsInitialDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  const LogoComponent = mounted
    ? isDarkMode
      ? PrismLogoDark
      : PrismLogo
    : isInitialDarkMode
      ? PrismLogoDark
      : PrismLogo;

  return <LogoComponent className="w-[150px]" />;
}
