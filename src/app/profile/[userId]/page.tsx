import UserProfile from '@/components/domain/user/UserProfile';
import OverallPRismReport from '@/components/domain/prism/OverallPRismReport';
import ParticipatingProjectList from '@/components/domain/project/projectList/ParticipatingProjectList';

interface UserProfilePageProps {
  params: { userId: string };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  return (
    <div className="container flex min-h-screen w-full max-w-[1040px] flex-col justify-center gap-6 p-4">
      <section className="flex flex-col gap-3">
        <h2 className="text-gray-900 body6">프로필</h2>
        <UserProfile fromMyProfile={false} />
      </section>
      <section className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 body6">PRism 종합 리포트</h2>
        </div>
        <OverallPRismReport fromMyProfile={false} />
      </section>
      <section className="flex flex-col gap-3">
        <ParticipatingProjectList userId={params.userId} fromMyProfile={false} />
      </section>
    </div>
  );
}
