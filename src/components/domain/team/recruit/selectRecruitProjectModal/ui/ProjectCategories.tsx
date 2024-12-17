import TagInput from '@/components/common/input/TagInput';

interface ProjectCategoriesProps {
  categories: string[];
}
export default function ProjectCategories({ categories }: ProjectCategoriesProps) {
  return (
    <ul className="flex items-center gap-1.5">
      {categories.map((category) => (
        <li key={category}>
          <TagInput value={category} isDisabled colorTheme="purple" />
        </li>
      ))}
    </ul>
  );
}
