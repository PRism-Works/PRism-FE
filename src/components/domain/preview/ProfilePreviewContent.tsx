import { useUserStore } from '@/stores/userStore';
import UserProfile from '../user/UserProfile';
import PRismAndRadialReport from '../prism/PRismAndRadialReport';
import ParticipatingProjectList from '../project/projectList/ParticipatingProjectList';

export default function ProfilePreviewContent() {
  const userId = useUserStore((state) => state.user?.userId);
  console.log(userId);
  return (
    <>
      <section className="flex flex-col gap-3">
        <h2 className="text-gray-900 body6">프로필</h2>
        <UserProfile fromMyProfile={false} userId={userId} />
      </section>
      <section className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 body6">PRism 종합 리포트</h2>
        </div>
        <PRismAndRadialReport fromMyProfile={false} forSaveImage={true} reportedUserId={userId} />
      </section>
      <section className="flex flex-col gap-3">
        <ParticipatingProjectList fromMyProfile={false} forSaveImage={true} userId={userId} />
      </section>
    </>
  );
}
