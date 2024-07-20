import BorderCard from '@/components/common/card/BorderCard';
import ProjectSummaryCard, {
  PROJECT_CARD_VARIANT,
} from '@/components/domain/project/projectCard/ProjectSummaryCard';
import UserProfile from '@/components/domain/user/userProfile/UserProfile';
import { type ProjectSummaryData } from '@/models/project/projectModels';

export default function MyPage() {
  // 예시로 데이터 넣어놨습니다. 추후 수정 부탁드립니다!
  const projectDatas: ProjectSummaryData[] = [
    {
      projectId: 1,
      projectname: '이름이름이름1',
      startDate: new Date(),
      endDate: new Date(),
      evaluation: '평가평가평가1',
      projectVisibility: true,
    },
    {
      projectId: 2,
      projectname: '이름이름이름2',
      startDate: new Date(),
      endDate: new Date(),
      evaluation:
        '평가평가평가평가평가평가아주긴평가평가평가평가아주긴평가평가평가평가아주긴평가아주긴평가',
      projectVisibility: true,
    },
    {
      projectId: 3,
      organizationName: '스위프',
      projectname: '이름이름이름긴이름긴이름긴이름',
      startDate: new Date(),
      endDate: new Date(),
      evaluation: '평가평가평가',
      projectVisibility: false,
    },
  ];
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-12">
      <div className="flex w-full justify-end" style={{ width: '90%' }}></div>
      <div className="flex w-full max-w-[1040px] flex-col gap-4">
        <span className="text-gray-900 body6">사용자 프로필</span>
        <UserProfile />
      </div>
      <div className="mt-8 flex w-full max-w-[1040px] flex-col gap-4">
        <span className="text-gray-900 body6">프로젝트 목록 </span>
        {projectDatas.length === 0 ? (
          <BorderCard className="h-[165px] w-full flex-col-center">
            <span className="text-gray-600 display6">등록된 프로젝트가 없습니다.</span>
          </BorderCard>
        ) : (
          <ul className="flex flex-col gap-4">
            {projectDatas.map((projectData, index) => (
              <li key={index}>
                <ProjectSummaryCard
                  variant={PROJECT_CARD_VARIANT.MY_PROFILE}
                  projectData={projectData}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
