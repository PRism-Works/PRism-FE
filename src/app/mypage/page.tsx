import BorderCard from '@/components/common/card/BorderCard';
import UserProfile from '@/components/domain/user/userProfile/UserProfile';
import OverallPRismReport from '@/components/domain/project/OverallPRismReport';
import ProjectSummaryCard from '@/components/domain/project/projectCard/ProjectSummaryCard';
import InformationTooltip from '@/components/common/tooltip/InformationTooltip';
import { PROJECT_CARD_VARIANT, type ProjectSummaryData } from '@/models/project/projectModels';

export default function MyPage() {
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
    <div className="container flex min-h-screen w-full max-w-[1040px] flex-col justify-center gap-5 p-4">
      <section className="flex flex-col gap-4">
        <h2 className="text-gray-900 body6">프로필</h2>
        <UserProfile />
      </section>
      <section className="flex flex-col gap-4">
        <OverallPRismReport />
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <h2 className="text-gray-900 body6">프로젝트 목록</h2>
          <InformationTooltip message="프로젝트 참여 비공개로 전환 시, 해당 프로젝트에 '익명'으로 표시돼요." />
        </div>
        {projectDatas.length === 0 ? (
          <BorderCard className="h-[165px] w-full flex-col-center">
            <span className="text-gray-600 display6">참여한 프로젝트가 없습니다.</span>
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
      </section>
    </div>
  );
}
