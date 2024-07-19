'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { PlanetIcons } from '@/assets/icon/planet';

interface CirclePlanetIconProps {
  className?: string;
  iconIndex?: number;
}

const CirclePlanetIcon = ({ className, iconIndex }: CirclePlanetIconProps) => {
  const planetKeys = Object.keys(PlanetIcons) as Array<keyof typeof PlanetIcons>;
  const [randomIndex, setRandomIndex] = useState<number>(() =>
    Math.floor(Math.random() * planetKeys.length),
  );

  useEffect(() => {
    if (iconIndex === undefined) {
      setRandomIndex(Math.floor(Math.random() * planetKeys.length));
    }
  }, [iconIndex, planetKeys.length]);

  const PlanetIcon =
    iconIndex !== undefined
      ? PlanetIcons[planetKeys[iconIndex]]
      : PlanetIcons[planetKeys[randomIndex]];

  return (
    <div
      className={cn('flex h-[56px] w-[56px] items-center justify-center rounded-full', className)}>
      {PlanetIcon && <PlanetIcon />}
    </div>
  );
};

export default CirclePlanetIcon;
