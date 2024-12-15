import TagInput from '@/components/common/input/TagInput';

export default function ProjecMembers() {
  return (
    <div
      aria-label="프로젝트 참여 인원"
      className="bg-gray-50 h-[170px] w-[400px] gap-y-4 rounded-xl px-10 py-7 flex-col-center">
      <div className="text-gray-600 display7">현재 팀원</div>
      <ul className="flex-wrap gap-2.5 flex-center">
        <li className="gap-x-2.5 flex-center">
          <TagInput value="기" isDisabled colorTheme="indigo" />
          <span>1명</span>
        </li>
        <li className="gap-x-2.5 flex-center">
          <TagInput value="기획자" isDisabled colorTheme="indigo" />
          <span>1명</span>
        </li>
        <li className="gap-x-2.5 flex-center">
          <TagInput value="백엔드" isDisabled colorTheme="indigo" />
          <span>1명</span>
        </li>
        <li className="gap-x-2.5 flex-center">
          <TagInput value="프론트엔드" isDisabled colorTheme="indigo" />
          <span>1명</span>
        </li>
        <li className="gap-x-2.5 flex-center">
          <TagInput value="프론트엔드" isDisabled colorTheme="indigo" />
          <span>1명</span>
        </li>
      </ul>
    </div>
  );
}
