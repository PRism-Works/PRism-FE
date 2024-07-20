import BorderCard from '@/components/common/card/BorderCard';
import PRismChart, { Evaluation } from '@/components/common/chart/PRismChart';
import RadialChart from '@/components/common/chart/RadialChart';
import TagInput from '@/components/common/input/TagInput';
import InformationTooltip from '@/components/common/tooltip/InformationTooltip';
import ProjectSummaryCard from '@/components/domain/project/projectCard/ProjectSummaryCard';
import UserProfile from '@/components/domain/user/userProfile/UserProfile';
import { RADIAL_EVALUATION_TYPES } from '@/models/evaluation/evaluationModels';
import { PROJECT_CARD_VARIANT, type ProjectSummaryData } from '@/models/project/projectModels';

export default function MyPage() {
  // 예시로 데이터 넣어놨습니다. 추후 수정 부탁드립니다!
  const chartData: Evaluation[] = [
    {
      evaluation: 'COMMUNICATION',
      percent: 60,
    },
    {
      evaluation: 'PROACTIVITY',
      percent: 50,
    },
    {
      evaluation: 'PROBLEM_SOLVING',
      percent: 70,
    },
    {
      evaluation: 'RESPONSIBILITY',
      percent: 80,
    },
    {
      evaluation: 'COOPERATION',
      percent: 90,
    },
  ];
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

  const prismTextData = [
    { label: '키워드', value: ['배려', '책임감', '도전정신'] },
    {
      label: '한 줄 요약',
      value:
        '문제점을 바로 파악하고 해결책을 생각하는 문제해결능력이 큰 장점인 사람니다. 다만 진행상황에 대해 즉시 공유하는 팀워크 능력이 다소 부족하다.',
    },
  ];

  return (
    <main className="container flex min-h-screen w-full max-w-[1040px] flex-col justify-center gap-5 p-4">
      <section className="flex flex-col gap-4">
        <h2 className="text-gray-900 body6">프로필</h2>
        <UserProfile />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-gray-900 body6">PRism 분석 리포트</h2>
        <BorderCard className="flex-wrap gap-8 flex-center">
          <div className="flex h-[330px] max-w-[330px] flex-col items-center gap-5 px-9 py-3">
            <div className="text-indigo-800 body6">나의 PRism</div>
            <div className="h-full w-full">
              <PRismChart data={chartData} />
            </div>
          </div>
          <div className="flex h-[330px] max-w-[560px] flex-col items-center gap-3 rounded-[30px] bg-gray-50 px-9 py-3">
            <div className="text-indigo-800 body6">나의 PRism 분석 리포트</div>
            <div className="gap-3 flex-col-center">
              <div className="flex-center">
                <RadialChart type={RADIAL_EVALUATION_TYPES.LEADERSHIP} value={70} />
                <RadialChart type={RADIAL_EVALUATION_TYPES.RELIABILITY} value={80} />
                <RadialChart type={RADIAL_EVALUATION_TYPES.CHARISMA} value={50} />
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-2">
                {prismTextData.map((item, index) => (
                  <div key={index} className="contents">
                    <div className="flex text-gray-400 mobile1">{item.label}</div>
                    <div className="flex gap-1 text-gray-800 display5">
                      {!item.value
                        ? '-'
                        : item.label === '키워드' && Array.isArray(item.value)
                          ? item.value.map((value, index) => (
                              <TagInput key={index} value={value} isDisabled />
                            ))
                          : item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BorderCard>
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <h2 className="text-gray-900 body6">프로젝트 목록</h2>
          <InformationTooltip message="프로젝트 참여 비공개로 전환 시, 해당 프로젝트에 '익명'으로 표시되요." />
        </div>
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
      </section>
    </main>
  );
}
