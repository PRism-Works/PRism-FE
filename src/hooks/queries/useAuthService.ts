import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { LoginResponse } from '@/models/auth/authApiModels';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';
import type { LoginForm } from '@/models/auth/authModels';
import { login } from '../../services/api/authApi';

export const useLogin = () => {
  const { closeModal } = useModalStore();

  return useMutation<LoginResponse, AxiosError, LoginForm>({
    mutationFn: (data: LoginForm) => login(data),
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data;

      // 토큰을 전역 저장소에 저장 (zustand에서 persist로 localStorage에 저장)
      useAuthStore.getState().login(accessToken, refreshToken);
      closeModal();
      alert('로그인에 성공했습니다.');
    },
    onError: (error) => {
      alert(error);
      console.error('로그인 실패: ', error);
    },
  });
};
