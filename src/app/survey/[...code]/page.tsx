'use client';

import SurveyPage from '@/components/domain/survey/SurveyPage';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useFetchSurveyLink } from '@/hooks/queries/useSurveyService';
import type { SurveyLinkErrorResponse } from '@/models/survey/surveyApiModels';
import { PageSpinner } from '@/components/common/spinner';

interface SurveyProps {
  params: {
    code: string | string[];
  };
}

const ErrorMessage = ({ message }: { message: string }) => {
  return <div className="text-gray-800 h-[80vh] text-center text-base flex-center">{message}</div>;
};

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

  const defaultErrorMessage = '설문 링크를 가져오는 중 오류가 발생했습니다. 다시 확인해 주세요.';
  const invalidLinkMessage = '설문 링크가 유효하지 않습니다. 다시 확인해 주세요.';

  if (!surveyCode) {
    return <ErrorMessage message={invalidLinkMessage} />;
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  if (error) {
    const axiosError = error as AxiosError<SurveyLinkErrorResponse>;
    const responseMessage = axiosError.response?.data?.message || defaultErrorMessage;
    return <ErrorMessage message={responseMessage} />;
  }

  if (!surveyData) {
    return <ErrorMessage message={defaultErrorMessage} />;
  }

  return <SurveyPage surveyData={surveyData} />;
}
