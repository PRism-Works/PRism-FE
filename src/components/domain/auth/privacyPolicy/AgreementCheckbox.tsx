'use client';

import CustomCheckbox from '@/components/common/checkbox/CustomCheckBox';
import { cn } from '@/lib/utils';

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
  return (
    <div
      className={cn(
        'w-full max-w-[420px]',
        { caption: isSmallScreen, display5: !isSmallScreen },
        className,
      )}>
      <div className="flex items-center gap-3">
        <CustomCheckbox checked={isAgreed} onCheckedChange={onToggle} />
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
