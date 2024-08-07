'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { PlanetIcons } from '@/assets/icon/planet';

interface CirclePlanetIconProps {
  className?: string;
  iconIndex?: number;
}

export default function CirclePlanetIcon({ className, iconIndex = 0 }: CirclePlanetIconProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const planetKeys = Object.keys(PlanetIcons) as Array<keyof typeof PlanetIcons>;
  const PlanetIcon = PlanetIcons[planetKeys[iconIndex % planetKeys.length]];

  const iconStyle = {
    filter: isDarkMode ? 'invert(1) hue-rotate(180deg) brightness(0.9)' : 'none',
  };

  return (
    <div
      className={cn('flex h-[56px] w-[56px] items-center justify-center rounded-full', className)}>
      {PlanetIcon && <PlanetIcon style={iconStyle} />}
    </div>
  );
}
