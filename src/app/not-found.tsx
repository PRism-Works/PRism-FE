import Link from 'next/link';
import PrismLogo from '@/assets/logo/logo-combine.svg';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col-center">
      <div className="mb-4 flex items-center">
        <PrismLogo className="mb-4 w-[150px]" />
      </div>

      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
        원하시는 페이지를 찾을 수 없어요.
      </h2>
      <div className="mb-6 text-center text-gray-600">
        찾아오려는 페이지의 주소가 잘못되었거나
        <br />
        주소의 변경, 혹은 삭제로 인해 사용할 수 없습니다.
        <br />
        입력하신 페이지의 주소가 정확한지 확인해 주세요.
      </div>
      <Link href="/">
        <Button variant="outline">홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
