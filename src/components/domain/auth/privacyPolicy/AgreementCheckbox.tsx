'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { CheckCircle2 } from 'lucide-react';

interface AgreementCheckboxProps {
  text: string;
  isAgreed: boolean;
  onToggle: () => void;
  isSmallScreen: boolean;
  privacyPolicyText: string;
  termsOfServiceText: string;
  onPrivacyPolicyClick: () => void;
  onTermsOfServiceClick: () => void;
  className?: string;
}

export default function AgreementCheckbox({
  text,
  isAgreed,
  onToggle,
  isSmallScreen,
  privacyPolicyText,
  termsOfServiceText,
  onPrivacyPolicyClick,
  onTermsOfServiceClick,
  className,
}: AgreementCheckboxProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div
      className={cn(
        'w-full max-w-[420px]',
        { caption: isSmallScreen, display5: !isSmallScreen },
        className,
      )}>
      <div className="flex items-center justify-between">
        <div className="mr-3" onClick={onToggle}>
          <CheckCircle2
            className={cn('h-7 w-7 cursor-pointer stroke-[1.5px]', {
              'text-purple-500 fill-purple-50': isAgreed && !isDarkMode,
              'text-gray-400 fill-transparent': !isAgreed && !isDarkMode,
              'fill-purple-800 text-purple-200': isAgreed && isDarkMode,
              'text-gray-800 fill-transparent': !isAgreed && isDarkMode,
            })}
          />
        </div>
        <p className="text-sm text-muted-foreground md:text-left">
          {text}{' '}
          <span
            onClick={onPrivacyPolicyClick}
            className="text-info-500 cursor-pointer font-medium underline underline-offset-4">
            {privacyPolicyText}
          </span>{' '}
          및{' '}
          <span
            onClick={onTermsOfServiceClick}
            className="text-info-500 cursor-pointer font-medium underline underline-offset-4">
            {termsOfServiceText}
          </span>
          에 모두 동의합니다.
        </p>
      </div>
    </div>
  );
}
