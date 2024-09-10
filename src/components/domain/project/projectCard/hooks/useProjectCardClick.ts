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

  const routeMap: Partial<Record<ProjectSummaryCardVariant, string>> = {
    [PROJECT_CARD_VARIANT.SEARCH_RESULT]: `/project/${projectId}`,
    [PROJECT_CARD_VARIANT.MY_PROFILE]: `/project/my/${projectId}`,
    [PROJECT_CARD_VARIANT.OTHER_PROFILE]: userId ? `/project/user/${userId}/${projectId}` : '',
  };

  const route = routeMap[variant] || '';

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
