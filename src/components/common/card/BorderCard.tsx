import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BorderCardProps {
  children: ReactNode;
  className?: string;
}

export default function BorderCard({ children, className }: BorderCardProps) {
  return (
    <div className={cn('bg-white border-gray-300 relative rounded-[30px] border p-4', className)}>
      {children}
    </div>
  );
}
