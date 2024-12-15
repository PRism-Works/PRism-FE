import TagInput from '@/components/common/input/TagInput';

export default function ProjectTags() {
  return (
    <ul className="flex items-center gap-1.5">
      <li>
        <TagInput value="금융" isDisabled colorTheme="purple" />
      </li>
      <li>
        <TagInput value="금융" isDisabled colorTheme="purple" />
      </li>
      <li>
        <TagInput value="금융" isDisabled colorTheme="purple" />
      </li>
    </ul>
  );
}
