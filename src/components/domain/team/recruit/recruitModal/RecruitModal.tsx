import ModalLayout from '@/components/common/modal/ModalLayout';

import RecruitButton from './ui/RecruitButton';
import RecruitCaption from './ui/RecruitCaption';

import { useModalStore } from '@/stores/modalStore';
import ProjectRegisterModal from '@/components/domain/project/projectRegisterModal/ProjectRegisterModal';
import SelectRecruitProjectModal from '@/components/domain/recruit/selectRecruitProjectModal/SelectRecruitProjectModal';

export default function RecruitModal() {
  const { openModal, closeModal } = useModalStore();

  const handleNewProject = () => {
    closeModal();
    openModal(<ProjectRegisterModal isRecruit />);
  };
  const handleExistingProjectWithEdit = () => {
    closeModal();
    openModal(<SelectRecruitProjectModal isEdit />);
  };
  const handleExistingProject = () => {
    closeModal();
    openModal(<SelectRecruitProjectModal isEdit={false} />);
  };
  return (
    <ModalLayout
      contentClassName="w-[420px]"
      title="팀 빌딩하기"
      description="새로운 팀원을 모으기 위한 팀 빌딩을 시작하세요.">
      <div className="mt-12 flex flex-col gap-y-[30px]">
        <div className="flex flex-col gap-y-2">
          <RecruitCaption label="NEW!" strongMessage="새로운 프로젝트" message="를 시작하시나요?" />
          <RecruitButton
            strongMessage="새 프로젝트"
            message="팀빌딩 글 작성하기"
            onClick={handleNewProject}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <RecruitCaption label="MY" strongMessage="기존에 등록한 프로젝트" message="가 있나요?" />
          <div className="flex flex-col gap-y-2">
            <RecruitButton
              strongMessage="수정하고"
              message="팀 빌딩 글 작성하기"
              onClick={handleExistingProjectWithEdit}
            />
            <RecruitButton
              strongMessage="수정 없이"
              message="팀 빌딩 글 작성하기"
              onClick={handleExistingProject}
            />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}
