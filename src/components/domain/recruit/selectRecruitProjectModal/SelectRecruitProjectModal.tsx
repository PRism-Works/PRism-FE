import ModalLayout from '@/components/common/modal/ModalLayout';
// import { ComponentSpinner } from '@/components/common/spinner';
// import { useGetParticipatingProjects } from '@/hooks/queries/useProjectService';

import RecruitProjectCard from './ui/RecruitProjectCard';

interface SelectRecruitProjectModalProps {
  isEdit: boolean;
}

// TODO: 백엔드에서 API 만들어주면 데이터 fetching 추가 작업 필요
export default function SelectRecruitProjectModal({ isEdit }: SelectRecruitProjectModalProps) {
  // const { data, isLoading, isError } = useGetParticipatingProjects(true, '');
  // if (isLoading) return <ComponentSpinner />;
  // if (isError) return <div>오류인디</div>;
  // if (!data?.data) return <div>데이터 없는디</div>;
  console.log(isEdit);
  return (
    <ModalLayout
      contentClassName="min-w-[1000px]"
      title="프로젝트 선택하기"
      description="팀 빌딩을 진행할 프로젝트를 선택하세요.">
      <ul className="mt-5 gap-y-3 flex-col-center">
        {testProjects.map((project) => (
          <li key={project.projectId} className="w-full">
            <RecruitProjectCard isEdit={isEdit} {...project} />
          </li>
        ))}
      </ul>
    </ModalLayout>
  );
}

// 백엔드에서 api 만들면 지우고 api 연결 예정
const testProjects: {
  projectId: number;
  myProjectRole: 'CREATOR' | 'MEMBER' | 'ADMIN'; // 프로젝트에_대한_내_직무
  projectThumbnailUrl: string;
  projectName: string;
  projectDescription: string;
  categories: string[];
  bookmarkCount: number; // project즐겨찾기수
  viewCount: number; // project조회수
  members: {
    roles: string[];
  }[];
}[] = [
  {
    projectId: 27,
    myProjectRole: 'CREATOR',
    projectThumbnailUrl: '',
    projectName: 'PRism - 테스트데이터',
    projectDescription: '동료 평가 기반 프로젝트 팀 빌딩 플랫폼',
    categories: ['Web', 'Platform', 'Education'],
    bookmarkCount: 42,
    viewCount: 156,
    members: [
      { roles: ['Frontend', 'Designer'] },
      { roles: ['Backend', 'DevOps'] },
      { roles: ['Frontend', 'PM'] },
    ],
  },
  {
    projectId: 28,
    myProjectRole: 'ADMIN',
    projectThumbnailUrl: '',
    projectName: 'Code Reviewer - 테스트데이터',
    projectDescription: 'AI 기반 코드 리뷰 자동화 도구',
    categories: ['AI', 'Developer Tools'],
    bookmarkCount: 28,
    viewCount: 94,
    members: [{ roles: ['AI Engineer', 'Backend'] }, { roles: ['Frontend', 'UI/UX'] }],
  },
  {
    projectId: 3,
    myProjectRole: 'MEMBER',
    projectThumbnailUrl: '',
    projectName: 'EcoTracker',
    projectDescription: '개인 탄소 발자국 추적 애플리케이션',
    categories: ['Mobile', 'Environment', 'Lifestyle'],
    bookmarkCount: 35,
    viewCount: 128,
    members: [
      { roles: ['Mobile Developer'] },
      { roles: ['Backend'] },
      { roles: ['Designer'] },
      { roles: ['PM'] },
    ],
  },
];
