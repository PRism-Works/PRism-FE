'use client';

import { cn } from '@/lib/utils';
import { PlanetIcons } from '@/assets/icon/planet';
import { ComponentSpinner } from '@/components/common/spinner';

interface CirclePlanetIconProps {
  className?: string;
  iconIndex?: number;
}

export default function CirclePlanetIcon({ className, iconIndex }: CirclePlanetIconProps) {
  const planetKeys = Object.keys(PlanetIcons) as Array<keyof typeof PlanetIcons>;
  const PlanetIcon =
    iconIndex !== undefined
      ? PlanetIcons[planetKeys[iconIndex % planetKeys.length]]
      : PlanetIcons[planetKeys[0]];

  return (
    <div
      className={cn('flex h-[56px] w-[56px] items-center justify-center rounded-full', className)}>
      {PlanetIcon ? (
        <PlanetIcon />
      ) : (
        <div className="h-[56px] w-[56px] flex-center">
          <ComponentSpinner />
        </div>
      )}
    </div>
  );
}
