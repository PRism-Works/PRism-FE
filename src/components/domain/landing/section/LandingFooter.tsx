'use client';

import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { Building2, Luggage, Users } from 'lucide-react';

export default function LandingFooter() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center py-16 text-white transition-opacity duration-1000 ease-in-out',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      )}>
      <div className="mb-12 space-x-16 flex-center">
        <div className="flex flex-col items-center">
          <Building2 className="h-7 w-7" />
          <span className="mt-2 body8">취업</span>
        </div>
        <div className="flex flex-col items-center">
          <Users className="h-7 w-7" />
          <span className="mt-2 body8">팀빌딩</span>
        </div>
        <div className="flex flex-col items-center">
          <Luggage className="h-7 w-7" />
          <span className="mt-2 body8">이직</span>
        </div>
      </div>

      <div className="mb-5 text-center">
        <p className="text-gray-300 headline3">
          신뢰성 있는
          <span className="text-purple-300"> 소프트 스킬 </span>
          검증으로
          <span className="text-purple-300"> 포트폴리오 </span>
          를 강화하고 <br />
          <span className="text-white">적극적인 PR</span>을 시작하세요.
        </p>
      </div>

      <p className="mb-48 text-center body2">성장을 위한 발돋움 바로 PRism에서</p>
    </div>
  );
}
