import PRismSpinner from '@/components/common/spinner/prismSpinner/PRismSpinner';

export default function PRismAnalyzeAnimation() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-85">
      <div className="relative z-20 flex max-h-[80vh] w-[50vw] flex-col items-center border-none bg-transparent p-4 shadow-none">
        <div className="relative z-30 mt-10">
          <PRismSpinner />
        </div>
        <div className="relative z-30 mt-14 text-center text-[15px] font-medium text-white md:text-base lg:text-lg">
          <p>AI가 PRism 분석리포트를 생성 중이에요.</p>
          <p>잠시만 기다려 주세요.</p>
        </div>
      </div>
    </div>
  );
}
