import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BorderCardProps {
  children: ReactNode;
  className?: string;
}

export default function BorderCard({ children, className }: BorderCardProps) {
  return (
    <div className={cn('relative rounded-[30px] border border-gray-300 bg-white p-4', className)}>
      {children}
    </div>
  );
}
