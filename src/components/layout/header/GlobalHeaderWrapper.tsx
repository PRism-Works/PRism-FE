'use client';

import { usePathname } from 'next/navigation';
import GlobalHeader from './GlobalHeader';

export default function GlobalHeaderWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith('/survey')) {
    return null;
  }

  return <GlobalHeader />;
}
