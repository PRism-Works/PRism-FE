'use client';

import { useUserStore } from '@/stores/userStore';
import BorderCard from '@/components/common/card/BorderCard';
import CirclePlanetIcon from '../CirclePlanetIcon';

export default function UserProfile() {
  // NOTE: api 연동 이후 수정 예정

  const userData = useUserStore((state) => state.user);

  const profileData = [
    { label: '이메일', value: userData?.email },
    {
      label: '관심 직무',
      value: userData?.roles.join(', '),
    },
    {
      label: '기술 스택',
      value: userData?.skills.join(', '),
    },
  ];

  return (
    <section className="flex w-full">
      <div className="mr-4 flex w-[248px] flex-col items-center justify-center rounded-[30px] bg-gradient-to-br from-[#1E1B4B] via-[#1E1B4B] to-[#312E81] body6">
        <CirclePlanetIcon className="bg-white" />
        <span className="mt-2.5 text-white">{userData?.name}</span>
      </div>
      <BorderCard className="flex w-full min-w-0 max-w-[776px] flex-grow overflow-hidden p-8">
        <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-2">
          {profileData.map((item, index) => (
            <div key={index} className="contents">
              <div className="text-purple-700 display6">{item.label}</div>
              <div className="flex min-h-[30px] text-gray-700 display4">{item.value || '-'}</div>
            </div>
          ))}
        </div>
      </BorderCard>
    </section>
  );
}
