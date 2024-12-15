import ModalLayout from '@/components/common/modal/ModalLayout';
// import { ComponentSpinner } from '@/components/common/spinner';
// import { useGetParticipatingProjects } from '@/hooks/queries/useProjectService';

import RecruitProjectCard from './ui/RecruitProjectCard';

interface SelectRecruitProjectModalProps {
  isEdit: boolean;
}

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
      <ul className="gap-y-3 flex-col-center">
        <li className="w-full">
          <RecruitProjectCard />
        </li>
        <li className="w-full">
          <RecruitProjectCard />
        </li>
        <li className="w-full">
          <RecruitProjectCard />
        </li>
        <li className="w-full">
          <RecruitProjectCard />
        </li>
      </ul>
    </ModalLayout>
  );
}
