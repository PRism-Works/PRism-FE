import { useRouter } from 'next/navigation';
import { useLogout } from '@/hooks/queries/useAuthService';

import { PageSpinner } from '@/components/common/spinner';

interface LogoutButtonProps {
  children: React.ReactNode;
}

export default function LogoutButton({ children }: LogoutButtonProps) {
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      // #20241122.syjang, window.location.href = '/'; 사용 시 redirect 시켜서 메시지박스 제대로 안뜨고 새로고침되어서 ux적으로 안좋았음
      // rotuer.push로 변경
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button onClick={handleLogout}>
      {children}
      {logoutMutation.isPending && <PageSpinner />}
    </button>
  );
}
