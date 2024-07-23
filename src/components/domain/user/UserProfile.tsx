'use client';

import Link from 'next/link';
import { useUserStore } from '@/stores/userStore';
import BorderCard from '@/components/common/card/BorderCard';
import CirclePlanetIcon from './CirclePlanetIcon';
import { PencilLine } from 'lucide-react';

export default function UserProfile() {
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
    <section className="relative flex w-full">
      <div className="mr-4 flex w-[248px] rounded-[30px] bg-gradient-to-br from-[#1E1B4B] via-[#1E1B4B] to-[#312E81] body6 flex-col-center">
        <CirclePlanetIcon className="bg-white" />
        <span className="mt-2.5 text-white">{userData?.name}</span>
      </div>
      <BorderCard className="flex h-[185px] w-full min-w-0 max-w-[776px] p-8">
        <div className="grid max-h-[500px] grid-cols-[100px_1fr] gap-x-2 gap-y-2 overflow-y-auto">
          {profileData.map((item, index) => (
            <div key={index} className="contents">
              <div className="text-purple-700 display6">{item.label}</div>
              <div className="flex min-h-[30px] text-gray-700 display4">{item.value || '-'}</div>
            </div>
          ))}
        </div>
      </BorderCard>
      <div className="absolute -right-2 -top-7 mr-4">
        <Link href="/mypage/edit">
          <div className="flex cursor-pointer items-center space-x-1 text-gray-800 underline decoration-current underline-offset-4 display5">
            <span>프로필 수정</span>
            <PencilLine className="h-4 w-4" />
          </div>
        </Link>
      </div>
    </section>
  );
}
