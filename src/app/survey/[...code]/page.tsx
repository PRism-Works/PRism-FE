'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFetchSurveyLink } from '@/hooks/queries/useSurveyService';
import SurveyPage from '@/components/domain/survey/SurveyPage';

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
    return <div>Invalid survey link. Please check the URL and try again.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !surveyData) {
    return <div>Error loading survey data. Please check the link and try again.</div>;
  }

  return <SurveyPage surveyData={surveyData} />;
}
