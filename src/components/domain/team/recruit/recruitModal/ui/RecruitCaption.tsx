interface RecruitCaptionProps {
  label: string;
  strongMessage: string;
  message: string;
}
export default function RecruitCaption({ label, strongMessage, message }: RecruitCaptionProps) {
  return (
    <div className="flex items-center gap-x-1.5">
      <div className="rounded-[2px] bg-black px-1 py-0.5 text-white caption2">{label}</div>
      <p className="text-purple-800 mobile2">
        <strong className="display7">{strongMessage}</strong>
        {message}
      </p>
    </div>
  );
}
