import { AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InformationTooltipProps {
  message: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export default function InformationTooltip({ message, side = 'bottom' }: InformationTooltipProps) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger>
          <AlertCircle className="h-4 w-4 stroke-gray-400 hover:fill-gray-200" />
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p className="text-gray-500 caption">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
