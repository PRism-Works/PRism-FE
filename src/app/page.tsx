import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      메인입니다요
      <Link href="/home">HOME으로 가기!!</Link>
    </main>
  );
}
