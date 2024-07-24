import BorderCard from '@/components/common/card/BorderCard';
import { ArrowUpRight } from 'lucide-react';
import ProjectImageSaveButton from '../projectButton/ProjectImageSaveButton';
import TagInput from '@/components/common/input/TagInput';
import ProjectVisibilityButton from '../projectButton/ProjectVisibilityButton';
import InformationTooltip from '@/components/common/tooltip/InformationTooltip';

interface ProjectIntroduceCardProps {
  projectId: number;
  userId?: string;
  fromMyProfile?: boolean; // true: 내 프로젝트 상세조회
}

// 프로젝트 개요
export default function ProjectIntroduceCard({
  projectId,
  userId,
  fromMyProfile = false,
}: ProjectIntroduceCardProps) {
  // 프로젝트 정보 조회 api 호출
  console.log(fromMyProfile, projectId);
  if (!fromMyProfile) {
    console.log(userId);
  }
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
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 body6">프로젝트 개요</h2>
          {fromMyProfile && <ProjectImageSaveButton className="-mb-4 mr-2" />}
        </div>
        <BorderCard className="p-7">
          <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-7">
            <div className="text-gray-600 display6">기간</div>
            <div className="text-black display4">2024.5.11 - 2024.7.22</div>

            <div className="text-gray-600 display6">역할</div>
            <div className="flex items-center gap-1">
              <TagInput isDisabled colorTheme="indigo" value="기획자" />
              <TagInput isDisabled colorTheme="indigo" value="디자이너" />
            </div>

            <div className="text-gray-600 display6">상세설명</div>
            <p className="text-black display4">
              이 프로젝트는 웰훕스팅 커뮤니티 이 프로젝트는 웰훕스팅 커뮤니티 스위코에서 주최한 6주
              단기 웹 서비스 출시를 목표로 진행된 프로젝트입니다. PRism은 it프로젝트를 마무리한
              사람들에게 동료평가 서비스를 제공하는 웹사이트입니다. 주요 기능은 프로젝트를 등록하고
              평가지를 보내 팀원들의 평가를 받아 5가지의 지표로 나타내는 것입니다.스위코에서 주최한
              6주 단기 웹 서비스 출시를 목표로 진행된 프로젝트입니다. PRism은 it프로젝트를 마무리한
              사람들에게 동료평가 서비스를 제공하는 웹사이트입니다. 주요 기능은 프로젝트를 등록하고
              평가지를 보내 팀원들의 평가를 받아 5가지의 지표로 나타내는 것입니다.
            </p>

            <div className="text-purple-800 display6">링크 바로가기</div>
            <div className="flex items-center justify-between">
              <div className="flex-center">
                <a href="PRism.co.kr" className="text-gray-500 underline underline-offset-4">
                  PRism.co.kr
                </a>
                <ArrowUpRight className="h-6 w-6 stroke-gray-500" />
              </div>
              {fromMyProfile && (
                <div className="space-x-2 flex-center">
                  <ProjectVisibilityButton projectId={projectId} initialVisibility={true} />
                  <InformationTooltip message="프로젝트 참여 비공개로 전환 시, 해당 프로젝트에 '익명'으로 표시돼요." />
                </div>
              )}
            </div>
          </div>
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
