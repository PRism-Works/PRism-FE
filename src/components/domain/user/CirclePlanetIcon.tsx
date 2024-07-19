'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { PlanetIcons } from '@/assets/icon/planet';

interface CirclePlanetIconProps {
  className?: string;
  iconIndex?: number;
}

const CirclePlanetIcon = ({ className, iconIndex }: CirclePlanetIconProps) => {
  const [randomIndex, setRandomIndex] = useState<number | null>(null);

  useEffect(() => {
    if (iconIndex === undefined) {
      const planetKeys = Object.keys(PlanetIcons) as Array<keyof typeof PlanetIcons>;
      const randomIdx = Math.floor(Math.random() * planetKeys.length);
      setRandomIndex(randomIdx);
    }
  }, [iconIndex]);

  const planetKeys = Object.keys(PlanetIcons) as Array<keyof typeof PlanetIcons>;
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
