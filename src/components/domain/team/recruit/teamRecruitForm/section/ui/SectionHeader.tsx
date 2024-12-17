interface SectionHeaderProps {
  number: number;
  text: string;
}

export function SectionHeader({ number, text }: SectionHeaderProps) {
  return (
    <h2 className="text-gray-900 flex items-center gap-3 mobile1 sm:body8 md:body6">
      <span className="h-6 w-6 rounded-full bg-black text-sm text-white flex-center dark:bg-gray-600 sm:h-7 sm:w-7 sm:text-base md:h-8 md:w-8 md:text-lg">
        {number}
      </span>
      {text}
    </h2>
  );
}
