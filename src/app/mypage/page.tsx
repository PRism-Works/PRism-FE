import UserProfile from '@/components/domain/user/UserProfile';
import PRismAndRadialReport from '@/components/domain/prism/PRismAndRadialReport';
import ParticipatingProjectList from '@/components/domain/project/projectList/ParticipatingProjectList';
import GoProjectLinkButton from '@/components/domain/project/projectButton/GoProjectLinkButton';
import ProjectRegisterButton from '@/components/domain/project/projectButton/ProjectRegisterButton';
import ImageSaveButton from '@/components/common/input/ImageSaveButton';
import { SAVE_TYPE } from '@/models/preview/previewModels';

export default function MyPage() {
  return (
    <div className="container flex min-h-screen w-full max-w-[1040px] flex-col justify-center gap-6 p-4">
      <section className="flex flex-col gap-3">
        <div className="mt-4 flex flex-col items-end gap-4 sm:flex-row sm:justify-end">
          <GoProjectLinkButton />
          <ProjectRegisterButton text="새 프로젝트 등록하기" className="h-[45px] w-[210px]" />
        </div>
        <h2 className="text-gray-900 body6">프로필</h2>
        <UserProfile fromMyProfile />
      </section>
      <section className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 body6">PRism 종합 리포트</h2>
          <ImageSaveButton saveType={SAVE_TYPE.PROFILE} className="-mb-4 mr-2" />
        </div>
        <PRismAndRadialReport fromMyProfile />
      </section>
      <section className="flex flex-col gap-3">
        <ParticipatingProjectList fromMyProfile />
      </section>
    </div>
  );
}
