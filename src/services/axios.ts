import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useAuthStore } from '@/stores/authStore';
const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 전역 스토어에서 accessToken값 가져와서 세팅하기
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config; // 기존에 수행하려고 했던 작업

    if (error.response?.status === 401 && originalRequest) {
      try {
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          throw new Error('Refresh token not found');
        }

        // authApi.ts에 따로 분리하려다가, 순환 참조 문제를 해결하고자 우선 여기에 넣었습니다.
        // 따로 분리하려면 instance 생성하는 파일을 하나 두고 각각 import 하는 방식이 되어야할 것 같습니다.
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/auth/refresh-token`,
          { refreshToken },
        );

        if (response.data.success && response.data.status === 200) {
          const { accessToken, refreshToken: newRefreshToken } = response.data.data;

          // 새로운 토큰 저장
          useAuthStore.getState().setAccessToken(accessToken);
          useAuthStore.getState().setRefreshToken(newRefreshToken);

          // 원래 요청 재시도
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } else {
          // 토큰 발급 실패 시 catch에서 처리
          throw new Error(response.data.message || 'Token refresh failed');
        }
      } catch (refreshError) {
        // refresh 실패 시 로그아웃 처리
        useAuthStore.getState().logout();

        // 에러 로그
        if (axios.isAxiosError(refreshError)) {
          console.error(
            `refresh token 발급 실패: ${refreshError.response?.data?.message || error.message}`,
          );
          console.error('Full error response: ', error);
        } else {
          console.error('refresh token 발급 실패: ', error);
        }

        // 메인 페이지로 리다이렉트
        window.location.href = '/';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export const ax = instance;
