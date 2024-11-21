import { useRouter } from 'next/navigation';
import useMessageBox from '@/hooks/useMessageBox';
import {
  PROJECT_CARD_VARIANT,
  type ProjectSummaryCardVariant,
} from '@/models/project/projectModels';

const useProjectCardClick = (
  variant: ProjectSummaryCardVariant,
  projectId: number,
  userId?: string,
) => {
  const router = useRouter();
  const { showConfirmMessageBox } = useMessageBox();

  const getRoute = (): string | null => {
    if (variant === PROJECT_CARD_VARIANT.OTHER_PROFILE && !userId) {
      return null;
    }

    const routeMap: Record<ProjectSummaryCardVariant, string> = {
      [PROJECT_CARD_VARIANT.SEARCH_RESULT]: `/project/${projectId}`,
      [PROJECT_CARD_VARIANT.ADMIN]: `/project/${projectId}`,
      [PROJECT_CARD_VARIANT.LINK_PREVIEW]: `/project/${projectId}`,
      [PROJECT_CARD_VARIANT.MY_PROFILE]: `/project/my/${projectId}`,
      [PROJECT_CARD_VARIANT.OTHER_PROFILE]: `/project/user/${userId}/${projectId}`,
    };

    return routeMap[variant] || null;
  };

  const route = getRoute();

  const handleCardClick = () => {
    if (route) {
      router.push(route);
    } else {
      showConfirmMessageBox('이동할 페이지가 없습니다.');
    }
  };

  return { handleCardClick };
};

export default useProjectCardClick;
