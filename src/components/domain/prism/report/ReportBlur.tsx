import { ComponentSpinner } from '@/components/common/spinner';

interface ReportBlurProps {
  fromMyProfile: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

export default function ReportBlur({
  fromMyProfile,
  isLoading = false,
  isError = false,
}: ReportBlurProps) {
  const message = isError
    ? 'PRism을 로드하는데 문제가 발생했습니다.'
    : isLoading
      ? `${fromMyProfile ? '나의' : '상대의'} PRism을 불러오는 중이에요!`
      : `아직 ${fromMyProfile ? '나의' : '상대의'} PRism이 없어요!`;
  const subMessage = isError
    ? '다시 시도해주세요.'
    : isLoading
      ? '잠시만 기다려주세요.'
      : fromMyProfile
        ? '프로젝트를 등록하고 나만의 PRism을 시작해 보세요.'
        : '';
  return (
    <div className="absolute inset-1 z-10 flex gap-3 rounded-[30px] bg-white bg-opacity-70 backdrop-blur-sm flex-col-center">
      {isLoading && <ComponentSpinner />}
      <p className="text-gray-700 body6">{message}</p>
      <p className="text-purple-800 display4">{subMessage}</p>
    </div>
  );
}
