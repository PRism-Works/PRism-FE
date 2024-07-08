import { STEPS } from '@/models/projectModels';

interface HeaderProps {
  currStep: number;
}

export default function Header({ currStep }: HeaderProps) {
  const step = STEPS[currStep];
  return (
    <div className="mb-[16px] flex items-center justify-center">
      <div className="h-10 w-10 rounded-full bg-black text-white body4 flex-center">
        {currStep + 1}
      </div>
      <div className="w-[283px] flex-col-center">
        <div className="flex justify-center">{step.icon}</div>
        <div className="body8">{step.title}</div>
        <div className="text-purple-800 display5">{step.subTitle}</div>
      </div>
    </div>
  );
}
