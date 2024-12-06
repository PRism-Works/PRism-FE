import { UseFormReturn } from 'react-hook-form';
import {
  TeamRecruitFormValues,
  CONTACT_METHODS,
  APPLICATION_METHODS,
  type ContactMethodType,
  type ApplicationMethodType,
} from '@/models/team/teamModels';

export default function usePlaceholders(form: UseFormReturn<TeamRecruitFormValues>) {
  const getContactPlaceholder = () => {
    const method = form.watch('contactMethod') as ContactMethodType;
    switch (method) {
      case CONTACT_METHODS.EMAIL:
        return '이메일을 입력해 주세요.';
      case CONTACT_METHODS.KAKAO:
        return '오픈 카톡 링크를 입력해 주세요.';
      case CONTACT_METHODS.LINE:
        return '라인 링크를 입력해 주세요.';
      case CONTACT_METHODS.TELEGRAM:
        return '텔레그램 링크를 입력해 주세요.';
      case CONTACT_METHODS.OTHER:
        return '기타 링크를 입력해 주세요.';
      default:
        return '오픈 카톡 링크를 입력해 주세요.';
    }
  };

  const getApplicationPlaceholder = () => {
    const method = form.watch('applicationMethod') as ApplicationMethodType;
    switch (method) {
      case APPLICATION_METHODS.EMAIL:
        return '이메일을 입력해 주세요.';
      case APPLICATION_METHODS.KAKAO:
        return '오픈 카톡 링크를 입력해 주세요.';
      case APPLICATION_METHODS.FORM:
        return '구글 폼 링크를 입력해 주세요.';
      case APPLICATION_METHODS.OTHER:
        return '기타 링크를 입력해 주세요.';
      default:
        return '오픈 카톡 링크를 입력해 주세요.';
    }
  };

  return { getContactPlaceholder, getApplicationPlaceholder };
}
