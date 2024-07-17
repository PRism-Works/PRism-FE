import { ReactNode } from 'react';

interface CustomCardProps {
  children: ReactNode;
  className?: string;
  variant: 'border' | 'shadow';
}

export default function CustomCard({ children, className, variant }: CustomCardProps) {
  const baseStyles = 'rounded-[20px] p-4 ';
  const variantStyles =
    variant === 'border'
      ? 'border border-gray-200'
      : 'cursor-pointer shadow-custom-4px transition-shadow duration-300 hover:shadow-custom-16px active:bg-gray-50';

  return <div className={`${baseStyles} ${variantStyles} ${className}`}>{children}</div>;
}
