import ProjectRegisterButton from '@/components/domain/project/projectButton/ProjectRegisterButton';
import ProjectSearchBar from '@/components/domain/project/projectSearch/ProjectSearchBar';

export default function Home() {
  return (
    <div className="container mx-auto min-h-screen p-12 flex-col-center">
      <div className="container flex w-[90%] justify-end">
        <ProjectRegisterButton className="mb-20 h-12 w-60" />
      </div>
      <div className="w-full flex-center">
        <ProjectSearchBar />
      </div>
    </div>
  );
}
