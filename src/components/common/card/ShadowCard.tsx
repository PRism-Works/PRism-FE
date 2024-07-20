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
        'cursor-pointer rounded-[20px] bg-white p-4 shadow-custom-4px transition-shadow duration-300 hover:shadow-custom-16px active:bg-gray-50',
        className,
      )}>
      {children}
    </div>
  );
}
