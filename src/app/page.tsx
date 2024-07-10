import ProjectRegisterButton from '@/components/domain/project/projectButton/ProjectRegisterButton';
import ProjectSearchBar from '@/components/domain/project/projectSearch/ProjectSearchBar';

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen p-12 flex-col-center">
      <div className="container flex justify-end" style={{ width: '90%' }}>
        <ProjectRegisterButton className="-mt-24 mb-20" />
      </div>
      <div className="flex w-full justify-center">
        <ProjectSearchBar className="w-full max-w-[690px]" />
      </div>
    </main>
  );
}
