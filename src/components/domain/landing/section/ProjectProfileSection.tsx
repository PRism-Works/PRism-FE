import { LandingIcons } from '@/assets/landing';
import LandingSectionLayout from './LandingSectionLayout';

export default function ProjectProfileSection() {
  const { Profile } = LandingIcons;

  return (
    <LandingSectionLayout
      title="세상에 알리는 나의 협업 능력"
      subtitle="프로젝트와 프로필을 공개해 나의 능력과 열정을 PR하세요.">
      <Profile className="w-full" style={{ width: 'clamp(250px, 75vw, 760px)' }} />
    </LandingSectionLayout>
  );
}
