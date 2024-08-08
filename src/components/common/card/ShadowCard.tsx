import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ShadowCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ShadowCard({ children, className, onClick = () => {} }: ShadowCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white cursor-pointer rounded-[20px] p-4 shadow-custom-4px transition-shadow duration-300 active:bg-gray-50 hover:shadow-custom-16px',
        className,
      )}>
      {children}
    </div>
  );
}
