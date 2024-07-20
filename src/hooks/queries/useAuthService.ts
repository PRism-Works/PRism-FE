import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { LoginResponse, LogoutResponse } from '@/models/auth/authApiModels';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';
import type { LoginForm } from '@/models/auth/authModels';
import { login, logout } from '../../services/api/authApi';
import { useUserStore } from '@/stores/userStore';
import { userData } from '@/services/api/userApi';

export const useLogin = () => {
  const { closeModal } = useModalStore();
  const setUser = useUserStore((state) => state.setUser);
  const loginAuthStore = useAuthStore((state) => state.login);

  return useMutation<LoginResponse, AxiosError, LoginForm>({
    mutationFn: login,
    onSuccess: async (response) => {
      const { accessToken, refreshToken } = response.data;

      // 토큰을 전역 저장소에 저장 (zustand에서 persist로 localStorage에 저장)
      loginAuthStore(accessToken, refreshToken);

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

        alert('로그인에 성공했습니다.');
      } catch (error) {
        console.error('유저 데이터 가져오기 실패:', error);
        alert('로그인은 성공했지만 유저 데이터를 가져오는데 실패했습니다.');
      } finally {
        closeModal();
      }
    },
    onError: (error) => {
      alert('로그인에 실패했습니다. 다시 시도해 주세요.');
      console.error('로그인 실패: ', error);
    },
  });
};

export const useLogout = () => {
  const logoutAuthStore = useAuthStore((state) => state.logout);
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation<LogoutResponse, AxiosError>({
    mutationFn: logout,
    onSuccess: () => {
      logoutAuthStore();
      clearUser();
      alert('로그아웃 되었습니다.');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
