'use client';

import SurveyPage from '@/components/domain/survey/SurveyPage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFetchSurveyLink } from '@/hooks/queries/useSurveyService';
import { PageSpinner } from '@/components/common/spinner';

interface SurveyProps {
  params: {
    code: string | string[];
  };
}

export default function Survey({ params }: SurveyProps) {
  const router = useRouter();
  const { code } = params;

  const surveyCode = Array.isArray(code) ? code[0] : code || '';

  const { data: surveyData, isLoading, error } = useFetchSurveyLink({ code: surveyCode });

  useEffect(() => {
    if (!surveyCode) {
      router.replace('/survey');
    }
  }, [surveyCode, router]);

  if (!surveyCode) {
    return <div>Invalid survey link. Please check the URL and try again.</div>; // 추후 404 페이지 or 다른 메시지로 변경
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  if (error || !surveyData) {
    return <div>Error loading survey data. Please check the link and try again.</div>; // 추후 404 페이지 or 다른 메시지로 변경
  }

  return <SurveyPage surveyData={surveyData} />;
}
