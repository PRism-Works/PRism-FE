'use client';

import { AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InformationTooltipProps {
  message: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export default function InformationTooltip({ message, side = 'bottom' }: InformationTooltipProps) {
  // TooltipTrigger 컴포넌트의 기본 동작 막기
  // (TooltipTrigger는 button 태그라, form 내부에 있을 때 클릭 시 submit 되어버려서 문제가 생김)
  const handleTooltipTriggerClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
  };

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger onClick={handleTooltipTriggerClick}>
          <AlertCircle className="h-4 w-4 stroke-gray-400 hover:fill-gray-200" />
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p className="text-gray-500 caption">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
