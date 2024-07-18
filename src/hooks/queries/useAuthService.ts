import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { LoginResponse } from '@/models/auth/authApiModels';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';
import type { LoginForm } from '@/models/auth/authModels';
import { login } from '../../services/api/authApi';
import { useUserStore } from '@/stores/userStore';
import { userData } from '@/services/api/userApi';

export const useLogin = () => {
  const { closeModal } = useModalStore();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation<LoginResponse, AxiosError, LoginForm>({
    mutationFn: login,
    onSuccess: async (response) => {
      const { accessToken, refreshToken } = response.data;

      // 토큰을 전역 저장소에 저장 (zustand에서 persist로 localStorage에 저장)
      useAuthStore.getState().login(accessToken, refreshToken);

      try {
        // 로그인 후 유저 데이터 가져오기
        const userDataResponse = await userData();
        const data = userDataResponse.data;

        // 유저 데이터를 Zustand 스토어에 저장
        setUser({
          name: data.username,
          email: data.email,
          roles: data.interestJobs,
          skills: data.skills, // 백엔드에서 아직 안넘겨줌. 빈값으로 설정
        });

        closeModal();
        alert('로그인에 성공했습니다.');
      } catch (error) {
        console.error('유저 데이터 가져오기 실패:', error);
        alert('로그인은 성공했지만 유저 데이터를 가져오는데 실패했습니다.');
      }
    },
    onError: (error) => {
      alert(error);
      console.error('로그인 실패: ', error);
    },
  });
};
