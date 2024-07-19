import BorderCard from '@/components/common/card/BorderCard';
import UserProfile from '@/components/domain/user/userProfile/UserProfile';

export default function MyPage() {
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center p-12">
        <div className="flex w-full justify-end" style={{ width: '90%' }}></div>
        <div className="flex w-full max-w-[1040px] flex-col gap-4">
          <span className="text-gray-900 body6">사용자 프로필</span>
          <UserProfile />
        </div>
        <div className="mt-8 flex w-full max-w-[1040px] flex-col gap-4">
          <span className="text-gray-900 body6">프로젝트 목록 </span>
          <BorderCard className="h-[165px] w-full flex-center">
            <span className="text-gray-600 display6">등록된 프로젝트가 없습니다.</span>
          </BorderCard>
        </div>
      </main>
    </>
  );
}
