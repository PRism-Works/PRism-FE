'use client';

import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface LandingSectionLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function LandingSectionLayout({
  title,
  subtitle,
  children,
}: LandingSectionLayoutProps) {
  const isSmallScreen = useMediaQuery('(max-width: 430px)');

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'w-full px-4 py-20 transition-opacity duration-700 ease-in-out flex-col-center',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      )}>
      <p
        className={cn(
          'mb-3 text-purple-300',
          isSmallScreen ? 'headline4' : 'headline3',
          'w-full break-words text-center',
        )}>
        {title}
      </p>
      <p
        className={cn(
          'mb-16 text-white',
          isSmallScreen ? 'body4' : 'body2',
          'w-full break-words text-center',
        )}>
        {subtitle}
      </p>
      <div
        className={cn(
          'transition-opacity delay-200 duration-700 ease-in-out flex-col-center',
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        )}
        style={{ transitionDelay: '0.5s' }}>
        {children}
      </div>
    </div>
  );
}
