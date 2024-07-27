import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface AgreementCheckboxProps {
  text: string;
  isAgreed: boolean;
  onToggle: () => void;
  isSmallScreen: boolean;
  privacyPolicyText: string;
  privacyPolicyLink: string;
  termsOfServiceText: string;
  termsOfServiceLink: string;
  className?: string;
}

export default function AgreementCheckbox({
  text,
  isAgreed,
  onToggle,
  isSmallScreen,
  privacyPolicyText,
  privacyPolicyLink,
  termsOfServiceText,
  termsOfServiceLink,
  className,
}: AgreementCheckboxProps) {
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
              'fill-purple-50 text-purple-500': isAgreed,
              'fill-transparent text-gray-400': !isAgreed,
            })}
          />
        </div>

        <p className="text-sm text-muted-foreground md:text-left">
          {text}{' '}
          <a
            href={privacyPolicyLink}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer text-info underline underline-offset-4">
            {privacyPolicyText}
          </a>{' '}
          및{' '}
          <a
            href={termsOfServiceLink}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer text-info underline underline-offset-4">
            {termsOfServiceText}
          </a>
          에 모두 동의합니다.
        </p>
      </div>
    </div>
  );
}
