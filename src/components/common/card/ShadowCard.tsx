import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ShadowCardProps {
  children: ReactNode;
  className?: string;
}

export default function ShadowCard({ children, className }: ShadowCardProps) {
  return (
    <div
      className={cn(
        'cursor-pointer rounded-[20px] p-4 shadow-custom-4px transition-shadow duration-300 hover:shadow-custom-16px active:bg-gray-50',
        className,
      )}>
      {children}
    </div>
  );
}
