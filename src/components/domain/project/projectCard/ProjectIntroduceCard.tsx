import BorderCard from '@/components/common/card/BorderCard';

interface ProjectIntroduceCardProps {
  projectId: number;
  fromMyProfile?: boolean;
}

// 프로젝트 개요
export default function ProjectIntroduceCard({
  projectId,
  fromMyProfile = false,
}: ProjectIntroduceCardProps) {
  // 프로젝트 정보 조회 api 호출
  console.log(fromMyProfile, projectId);
  return (
    <div className="flex flex-col gap-10">
      <section className="flex-col-center">
        <h1 className="text-gray-900 body6">
          프로젝트
          <EmphasizeWord text="Prism" />
          에서
          <EmphasizeWord text="기획자" />로 활동한 이지영입니다
        </h1>
      </section>
      <section>
        <h2 className="text-gray-900 body6">프로젝트 개요</h2>
        <BorderCard>
          <div></div>
        </BorderCard>
      </section>
    </div>
  );
}

interface EmphasizeWordProps {
  text: string;
}
const EmphasizeWord = ({ text }: EmphasizeWordProps) => {
  return (
    <span className="relative mx-2 inline-block text-purple-700 body6 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:content-[''] after:absolute after:bottom-[-2.5px] after:right-[-5px] after:h-[5px] after:w-[5px] after:rounded-full after:bg-black">
      {text}
    </span>
  );
};
