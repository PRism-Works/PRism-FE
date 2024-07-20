'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { PlanetIcons } from '@/assets/icon/planet';
import { ComponentSpinner } from '@/components/common/spinner';

interface CirclePlanetIconProps {
  className?: string;
  iconIndex?: number;
}

const CirclePlanetIcon = ({ className, iconIndex }: CirclePlanetIconProps) => {
  const planetKeys = Object.keys(PlanetIcons) as Array<keyof typeof PlanetIcons>;
  const [randomIndex, setRandomIndex] = useState<number | null>(null);

  // hydration 오류로, 마운트 된 경우에만 아이콘 접근하도록 수정
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    if (iconIndex === undefined) {
      setRandomIndex(Math.floor(Math.random() * planetKeys.length));
    }
  }, [iconIndex, planetKeys.length]);

  if (!isMounted) {
    // 로딩 상태 표시
    return (
      <div className="h-[56px] w-[56px] flex-center">
        <ComponentSpinner />
      </div>
    );
  }

  const PlanetIcon =
    iconIndex !== undefined
      ? PlanetIcons[planetKeys[iconIndex]]
      : randomIndex !== null
        ? PlanetIcons[planetKeys[randomIndex]]
        : null;

  return (
    <div
      className={cn('flex h-[56px] w-[56px] items-center justify-center rounded-full', className)}>
      {PlanetIcon && <PlanetIcon />}
    </div>
  );
};

export default CirclePlanetIcon;
