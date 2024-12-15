import ShadowCard from '@/components/common/card/ShadowCard';
import ProjectRole from './ProjectRole';
import ProjectTags from './ProjectTags';
import ProjectStats from './ProjectStats';
import ProjecMembers from './ProjectMembers';
import ProjectThumbnail from './ProjectThumbnail';
import ProjectDescription from './ProjectDescription';

export default function RecruitProjectCard() {
  return (
    <ShadowCard className="flex flex-col justify-center gap-y-2">
      <ProjectRole />
      <div className="flex items-center justify-between">
        <div className="gap-x-5 flex-center">
          <ProjectThumbnail />
          <ProjectDescription />
        </div>
        <ProjecMembers />
      </div>
      <footer className="flex items-center justify-between">
        <ProjectTags />
        <ProjectStats />
      </footer>
    </ShadowCard>
  );
}
