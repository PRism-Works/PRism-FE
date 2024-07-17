import { ReactNode } from 'react';

interface BorderCardProps {
  children: ReactNode;
  className?: string;
}

export default function BorderCard({ children, className }: BorderCardProps) {
  return <div className={`rounded-[20px] border border-gray-200 p-4 ${className}`}>{children}</div>;
}
