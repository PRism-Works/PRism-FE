import { useUserStore } from '@/stores/userStore';

export default function ProfilePreviewContent() {
  const userId = useUserStore((state) => state.user?.userId);
  console.log(userId);
  return <></>;
}
