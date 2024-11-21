import { ChevronRight } from 'lucide-react';

interface RecruitButtonProps {
  strongMessage: string;
  message: string;
  onClick: () => void;
}

export default function RecruitButton({ strongMessage, message, onClick }: RecruitButtonProps) {
  return (
    <button
      className="delay-50 flex flex-col gap-y-2 rounded-[10px] bg-purple-50 transition-colors ease-in hover:bg-purple-100"
      onClick={onClick}>
      <div className="flex w-full items-center justify-between p-4">
        <p className="text-gray-500 body8">
          <span className="text-purple-800 font-bold">{strongMessage}</span> {message}
        </p>
        <ChevronRight className="h-[42px] w-[42px] stroke-1" />
      </div>
    </button>
  );
}
