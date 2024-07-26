'use client';

import { cn } from '@/lib/utils';
import { PlanetIcons } from '@/assets/icon/planet';

interface CirclePlanetIconProps {
  className?: string;
  iconIndex?: number;
}

export default function CirclePlanetIcon({ className, iconIndex = 0 }: CirclePlanetIconProps) {
  const planetKeys = Object.keys(PlanetIcons) as Array<keyof typeof PlanetIcons>;
  const PlanetIcon = PlanetIcons[planetKeys[iconIndex % planetKeys.length]];

  return (
    <div
      className={cn('flex h-[56px] w-[56px] items-center justify-center rounded-full', className)}>
      {PlanetIcon && <PlanetIcon />}
    </div>
  );
}
