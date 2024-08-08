'use client';

import { cn } from '@/lib/utils';
import TagInput from '@/components/common/input/TagInput';
import ShadowCard from '@/components/common/card/ShadowCard';
import { ChevronRight } from 'lucide-react';
import CirclePlanetIcon from './CirclePlanetIcon';

import {
  USER_CARD_VARIANT,
  type UserSummaryCardVariant,
  type UserSummaryData,
} from '@/models/user/userModels';
import { maskEmail, maskName } from '@/lib/masking';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';

interface UserSummaryCardProps {
  userData: UserSummaryData;
  variant?: UserSummaryCardVariant;
  iconIndex: number;
}

export default function UserSummaryCard({
  userData,
  variant = USER_CARD_VARIANT.MEMBER_PUBLIC,
  iconIndex,
}: UserSummaryCardProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isPublicUser = variant === USER_CARD_VARIANT.MEMBER_PUBLIC;
  const isPrivateUser = variant === USER_CARD_VARIANT.MEMBER_PRIVATE;

  const handleOpenUserProfile = () => {
    if (!isPublicUser) {
      alert('비공개 팀원입니다.');
      return;
    }
    if (user?.userId === userData.userId) {
      // 클릭한 유저카드가 나의 카드라면, 마이 페이지로 이동
      router.push('/mypage');
    } else {
      router.push(`/profile/${userData.userId}`);
    }
  };

  return (
    <ShadowCard
      className={cn(
        'flex h-[157px] w-[512px] flex-col justify-between p-6',
        !isPublicUser && 'cursor-default',
      )}
      onClick={handleOpenUserProfile}>
      <div className="flex items-start space-x-4">
        <CirclePlanetIcon className="bg-gray-100" iconIndex={iconIndex} />
        <div className="flex flex-col justify-center">
          <p className="body8">{isPrivateUser ? maskName(userData.name) : userData.name}</p>
          <p className="text-gray-500 display5">
            {isPublicUser ? userData.email : maskEmail(userData.email)}
          </p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <ul className="flex items-center gap-2">
          {userData.roles.map((role, index) => (
            <li key={index}>
              <TagInput value={role} isDisabled colorTheme="indigo" />
            </li>
          ))}
        </ul>
        {isPublicUser && (
          <div className="text-gray-600 cursor-pointer underline decoration-current underline-offset-4 display5 flex-center">
            프로필 보러가기
            <ChevronRight className="h-4 w-4" />
          </div>
        )}
      </div>
    </ShadowCard>
  );
}
