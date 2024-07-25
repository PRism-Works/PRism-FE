import UserProfile from '@/components/domain/user/UserProfile';
import OverallPRismReport from '@/components/domain/prism/OverallPRismReport';
import ParticipatingProjectList from '@/components/domain/project/projectList/ParticipatingProjectList';
import GoProjectLinkButton from '@/components/domain/project/projectButton/GoProjectLinkButton';
import ProjectRegisterButton from '@/components/domain/project/projectButton/ProjectRegisterButton';
import ProjectImageSaveButton from '@/components/domain/project/projectButton/ProjectImageSaveButton';

export default function MyPage() {
  return (
    <div className="container flex min-h-screen w-full max-w-[1040px] flex-col justify-center gap-6 p-4">
      <section className="flex flex-col gap-3">
        <div className="mt-4 flex justify-end gap-4">
          <GoProjectLinkButton />
          <ProjectRegisterButton text="새 프로젝트 등록하기" className="h-[45px] w-[210px]" />
        </div>
        <h2 className="text-gray-900 body6">프로필</h2>
        <UserProfile fromMyProfile iconIndex={0} />
      </section>
      <section className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 body6">PRism 종합 리포트</h2>
          <ProjectImageSaveButton className="-mb-4 mr-2" />
        </div>
        <OverallPRismReport fromMyProfile />
      </section>
      <section className="flex flex-col gap-3">
        <ParticipatingProjectList fromMyProfile />
      </section>
    </div>
  );
}
