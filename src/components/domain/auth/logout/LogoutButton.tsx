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
      // 로그아웃 시, 홈 화면으로 이동
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div onClick={handleLogout}>
      {children}
      {logoutMutation.isPending && <PageSpinner />}
    </div>
  );
}
