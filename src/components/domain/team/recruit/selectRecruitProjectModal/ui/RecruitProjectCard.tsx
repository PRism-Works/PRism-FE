'use client';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/stores/modalStore';

import ShadowCard from '@/components/common/card/ShadowCard';
import ProjectRole from './ProjectRole';
import ProjectStats from './ProjectStats';
import ProjecMembers from './ProjectMembers';
import ProjectCardInfo from './ProjectCardInfo';
import ProjectThumbnail from './ProjectThumbnail';
import ProjectCategories from './ProjectCategories';
import useProjectUpdateModal from '@/components/domain/project/hooks/useProjectUpdateModal';

interface RecruitProjectCardProps {
  isEdit: boolean;
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
}
export default function RecruitProjectCard({
  isEdit,
  projectId,
  myProjectRole,
  projectThumbnailUrl,
  projectName,
  projectDescription,
  categories,
  bookmarkCount,
  viewCount,
  members,
}: RecruitProjectCardProps) {
  const router = useRouter();
  const closeModal = useModalStore((state) => state.closeModal);
  const { handleOpenProjectUpdateModal } = useProjectUpdateModal(projectId, true);
  const handleClickRecuritProject = (event: React.MouseEvent<HTMLElement>) => {
    closeModal();
    if (isEdit) {
      handleOpenProjectUpdateModal(event);
    } else {
      router.push(`/team/recruit/${projectId}`);
    }
  };
  return (
    <ShadowCard
      onClick={handleClickRecuritProject}
      className="flex flex-col justify-center gap-y-2">
      <ProjectRole myProjectRole={myProjectRole} />
      <div className="flex items-center justify-between">
        <div className="gap-x-5 flex-center">
          <ProjectThumbnail projectThumbnailUrl={projectThumbnailUrl} />
          <ProjectCardInfo {...{ projectName, projectDescription }} />
        </div>
        <ProjecMembers members={members} />
      </div>
      <footer className="flex items-center justify-between">
        <ProjectCategories categories={categories} />
        <ProjectStats {...{ bookmarkCount, viewCount }} />
      </footer>
    </ShadowCard>
  );
}
