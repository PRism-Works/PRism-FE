'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageSpinner } from '@/components/common/spinner';

export default function SurveyPageRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      router.replace(`/survey/${code}`);
    }
  }, [code, router]);

  return <PageSpinner />;
}
