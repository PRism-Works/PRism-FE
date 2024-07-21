import BorderCard from '@/components/common/card/BorderCard';
import ProjectRegisterButton from '@/components/domain/project/projectButton/ProjectRegisterButton';
import ProjectSummaryCard from '@/components/domain/project/projectCard/ProjectSummaryCard';
import { PROJECT_CARD_VARIANT, ProjectSummaryData } from '@/models/project/projectModels';

// 등록 프로젝트 수정 페이지
export default function ProjectManagePage() {
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
    <main className="container mx-auto flex min-h-screen flex-col items-center p-5">
      <div className="flex w-full max-w-[1040px] flex-col items-end">
        <ProjectRegisterButton text="새 프로젝트 등록하기" />
        <section className="flex w-full flex-col gap-4">
          <h2 className="text-gray-900 body6">내가 등록한 프로젝트</h2>
          {projectDatas.length === 0 ? (
            <BorderCard className="h-[165px] w-full flex-col-center">
              <span className="text-gray-600 display6">등록한 프로젝트가 없습니다.</span>
            </BorderCard>
          ) : (
            <ul className="flex flex-col gap-4">
              {projectDatas.map((projectData, index) => (
                <li key={index}>
                  <ProjectSummaryCard
                    variant={PROJECT_CARD_VARIANT.ADMIN}
                    projectData={projectData}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
