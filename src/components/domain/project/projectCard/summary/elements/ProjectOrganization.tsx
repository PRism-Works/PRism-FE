import { cn } from '@/lib/utils';
import useIsDarkMode from '@/hooks/useIsDarkMode';

interface ProjectOrganizationProps {
  organizationName: string;
  forSaveImage?: boolean; // 이미지 저장용 여부
}

const ProjectOrganization = ({
  organizationName,
  forSaveImage = false,
}: ProjectOrganizationProps) => {
  const isDarkMode = useIsDarkMode();

  /* 이미지 저장용인 경우: 배경 없이 텍스트 색만 변경(이미지 잘림 현상) 
  소속이 있는 경우 : bg-gray-600, 없는 경우: bg-gray-400 */
  const className = cn('w-fit rounded-[20px] text-white mobile1 px-3', {
    // organizationName이 존재할 때
    'text-gray-600 px-0': organizationName && forSaveImage,
    'bg-gray-500': organizationName && !forSaveImage && isDarkMode,
    'bg-gray-600': organizationName && !forSaveImage && !isDarkMode,

    // organizationName이 없을 때
    'text-gray-300 px-0': !organizationName && forSaveImage,
    'bg-gray-700': !organizationName && !forSaveImage && isDarkMode,
    'bg-gray-400': !organizationName && !forSaveImage && !isDarkMode,
  });

  return <p className={className}>{organizationName || '소속 없음'}</p>;
};

export default ProjectOrganization;
