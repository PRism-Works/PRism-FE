import TagInput from '@/components/common/input/TagInput';

interface ProjectCategoryProps {
  categories: string[];
  forSaveImage?: boolean;
}

const ProjectCategory = ({ categories, forSaveImage = false }: ProjectCategoryProps) => {
  return (
    <ul className="flex gap-1">
      {categories?.map((category, index) => (
        <li key={index}>
          <TagInput value={category} isDisabled forSaveImage={forSaveImage} />
        </li>
      ))}
    </ul>
  );
};

export default ProjectCategory;
