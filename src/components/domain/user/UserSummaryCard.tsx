'use client';

import ShadowCard from '@/components/common/card/ShadowCard';
import TagInput from '@/components/common/input/TagInput';
import CirclePlanetIcon from './CirclePlanetIcon';
import { ChevronRight } from 'lucide-react';

export default function UserSummaryCard() {
  const handleOpenUserProfile = () => {
    console.log('프로필 보러가기 연결 예정');
  };

  // NOTE: project API 연동 이후 하드코딩된 값 변경 예정

  return (
    <ShadowCard className="flex h-[157px] w-[512px] flex-col justify-between p-6">
      <div className="flex items-start space-x-4">
        <CirclePlanetIcon className="bg-gray-100" />
        <div className="flex flex-col justify-center">
          <p className="body8">이지영</p>
          <p className="text-gray-500 display5">fj298@gmail.com</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center">
          <TagInput value="기획자" buttonType="none" colorTheme="indigo" className="mr-2" />
          <TagInput value="디자이너" buttonType="none" colorTheme="indigo" />
        </div>
        <div
          className="cursor-pointer text-gray-600 underline decoration-current display5 flex-center"
          style={{ textUnderlineOffset: '4px' }}
          onClick={handleOpenUserProfile}>
          프로필 보러가기
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </ShadowCard>
  );
}
