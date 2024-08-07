'use client';

import { forwardRef } from 'react';
import useIsDarkMode from '@/hooks/useIsDarkMode';
import ModalLayout from './ModalLayout';
import { Download, Share2 } from 'lucide-react';
import InformationTooltip from '../tooltip/InformationTooltip';
import PrismLogo from '@/assets/logo/logo.svg';
import PrismLogoDark from '@/assets/logo/logo-darkmode.svg';

interface PreviewModalLayoutProps {
  handleSave: () => void;
  handleShare: () => void;
  children: React.ReactNode;
}

const actionButtonStyles = {
  span: 'group flex cursor-pointer items-center gap-1 transition-all duration-300 ease-in-out hover:scale-105 hover:font-semibold hover:text-purple-600',
  icon: 'transition-colors duration-300 ease-in-out group-hover:stroke-purple-800',
};

const PreviewModalLayout = forwardRef<HTMLDivElement, PreviewModalLayoutProps>(
  ({ handleSave, handleShare, children }, ref) => {
    const isDarkMode = useIsDarkMode();
    const Logo = isDarkMode ? PrismLogoDark : PrismLogo;

    return (
      <ModalLayout
        title={
          <div className="gap-2 flex-center">
            미리보기
            <InformationTooltip message="이미지 저장 최적화를 위해 디자인이 실제와 다를 수 있습니다." />
          </div>
        }
        showCloseButton={false}
        preventOutsideClose={false}
        contentClassName="min-w-[1200px]">
        <div className="mt-7 flex gap-4 flex-col-center">
          <div className="flex w-full items-center justify-end gap-5 body8">
            <span className={actionButtonStyles.span} onClick={handleSave}>
              저장하기
              <Download className={actionButtonStyles.icon} />
            </span>
            <span className={actionButtonStyles.span} onClick={handleShare}>
              공유하기
              <Share2 className={actionButtonStyles.icon} />
            </span>
          </div>
          <div ref={ref} className="bg-gray-50 flex w-[1100px] flex-col gap-10 rounded-2xl p-9">
            <header className="w-full flex-center">
              <Logo className="mb-4 w-[150px]" />
            </header>
            {children}
            <footer className="gap-3 flex-center">
              <span className="text-gray-700 body6">PRism</span>
              <span className="text-gray-400 display5">©PRism. All rights reserved.</span>
            </footer>
          </div>
        </div>
      </ModalLayout>
    );
  },
);

PreviewModalLayout.displayName = 'PreviewModalLayout';

export default PreviewModalLayout;
