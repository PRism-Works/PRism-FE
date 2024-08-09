import { ComponentSpinner } from '@/components/common/spinner';
import useIsDarkMode from '@/hooks/useIsDarkMode';
import { cn } from '@/lib/utils';

interface ReportBlurProps {
  fromMyProfile: boolean;
  isLoading?: boolean;
  isError?: boolean;
  forSaveImage?: boolean;
}

export default function ReportBlur({
  fromMyProfile,
  isLoading = false,
  isError = false,
  forSaveImage = false,
}: ReportBlurProps) {
  const isDarkMode = useIsDarkMode();
  const message = isError
    ? 'PRism을 로드하는데 문제가 발생했습니다.'
    : isLoading
      ? `${fromMyProfile ? '나의' : '상대의'} PRism 분석 결과를 불러오는 중이에요!`
      : `아직 ${fromMyProfile ? '나의' : '상대의'} PRism이 없어요!`;
  const subMessage = isError
    ? '다시 시도해주세요.'
    : isLoading
      ? '잠시만 기다려주세요.'
      : fromMyProfile
        ? '프로젝트를 등록하고 나만의 PRism을 시작해 보세요.'
        : '';
  return (
    <div
      className={cn(
        'absolute inset-1 z-10 flex gap-3 rounded-[30px] backdrop-blur-[8px] flex-col-center',
        isDarkMode ? 'bg-gray-800' : 'bg-white',
        forSaveImage ? 'bg-opacity-90' : 'bg-opacity-70',
      )}>
      {isLoading && <ComponentSpinner />}
      <p className="text-gray-700 body6">{message}</p>
      <p className="text-purple-800 display4">{subMessage}</p>
    </div>
  );
}
