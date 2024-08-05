'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const tabs = [
  { label: '팀원평가', id: 'survey' },
  { label: '분석지표', id: 'chart' },
  { label: 'PR하기', id: 'profile' },
  { label: '프로젝트 등록', id: 'register' },
  { label: '프로젝트 검색', id: 'search' },
];

export default function LandingTabs() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + window.scrollY;
      const elementHeight = elementRect.height;
      const viewportHeight = window.innerHeight;
      const offset = elementTop - (viewportHeight / 2 - elementHeight / 2);

      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className={cn(
        'fixed left-0 right-0 z-50 w-full bg-[#1e1b4bd4]',
        isSticky ? 'top-0' : 'top-[70px]',
      )}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="rounded px-2 py-1 text-white transition-colors duration-200 body6 md:text-base"
            onClick={() => handleClick(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
