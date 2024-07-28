'use client';

import { cn } from '@/lib/utils';
import { PencilLine } from 'lucide-react';
import CirclePlanetIcon from './CirclePlanetIcon';
import { ComponentSpinner } from '@/components/common/spinner';
import BorderCard from '@/components/common/card/BorderCard';

import Link from 'next/link';
import { useUserStore } from '@/stores/userStore';
import { useUserProfileByUserId } from '@/hooks/queries/useUserService';

interface UserProfileProps {
  fromMyProfile: boolean;
  userId?: string;
}

export default function UserProfile({ fromMyProfile, userId }: UserProfileProps) {
  const loginUserId = useUserStore((state) => state.user?.userId);
  const targetId = fromMyProfile ? loginUserId : userId;

  const { data, isLoading, isError } = useUserProfileByUserId(targetId || '');

  const userData = data?.data;
  const profileData = [
    { label: '이메일', value: userData?.email },
    {
      label: '관심 직무',
      value: userData?.interestJobs.join(', '),
    },
    {
      label: '기술 스택',
      value: userData?.skills.join(', '),
    },
  ];

  const isValidData = !(isLoading || isError || !userData);

  const renderInvalidText = () => (
    <span className="text-gray-600 display6 flex-center">
      {isLoading ? (
        <ComponentSpinner />
      ) : isError ? (
        '사용자 정보를 불러오는 중 오류가 발생했습니다.'
      ) : (
        '사용자 정보가 없습니다.'
      )}
    </span>
  );

  return (
    <section className="relative flex w-full gap-4">
      <div className="w-[248px] rounded-[30px] bg-gradient-to-br from-[#1E1B4B] via-[#1E1B4B] to-[#312E81] body6 flex-col-center">
        {isLoading ? (
          <ComponentSpinner />
        ) : (
          <>
            <CirclePlanetIcon className="bg-white" iconIndex={0} />
            <span className="mt-2.5 text-white">{userData?.username || '이름 없음'}</span>
          </>
        )}
      </div>
      <BorderCard
        className={cn(
          'flex h-[185px] w-full min-w-0 max-w-[776px] p-8',
          !isValidData && 'flex-center',
        )}>
        {!isValidData ? (
          renderInvalidText()
        ) : (
          <div className="grid max-h-[500px] grid-cols-[100px_1fr] gap-x-2 gap-y-2 overflow-y-auto">
            {profileData.map((item, index) => (
              <div key={index} className="contents">
                <div className="text-purple-700 display6">{item.label}</div>
                <div className="flex min-h-[30px] text-gray-700 display4">{item.value || '-'}</div>
              </div>
            ))}
          </div>
        )}
      </BorderCard>
      {fromMyProfile && (
        <div className="absolute -right-2 -top-7 mr-4">
          <Link href="/mypage/edit">
            <div className="flex cursor-pointer items-center space-x-1 text-gray-800 underline decoration-current underline-offset-4 display5">
              <span>프로필 수정</span>
              <PencilLine className="h-4 w-4" />
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}
