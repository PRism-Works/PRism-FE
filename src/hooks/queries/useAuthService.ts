import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type {
  LoginResponse,
  LogoutResponse,
  SendEmailCodeRequest,
  SendEmailCodeResponse,
  VerifyAuthCodeRequest,
  VerifyAuthCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  EmailExistsResponse,
  SignupResponse,
  SignupRequest,
} from '@/models/auth/authApiModels';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';
import type { LoginForm } from '@/models/auth/authModels';
import {
  login,
  logout,
  sendEmailCode,
  verifyAuthCode,
  resetPassword,
  checkEmailExists,
  signup,
} from '../../services/api/authApi';
import { useUserStore } from '@/stores/userStore';
import { userDataByLoginUser } from '@/services/api/userApi';

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
        const userDataResponse = await userDataByLoginUser();
        const data = userDataResponse.data;

        // 유저 데이터를 Zustand 스토어에 저장
        setUser({
          userId: data.userId,
          name: data.username,
          email: data.email,
          roles: data.interestJobs,
          skills: data.skills, // 백엔드에서 아직 안넘겨줌. 빈값으로 설정
        });
      } catch (error) {
        console.error('유저 데이터 가져오기 실패:', error);
        console.error('로그인은 성공했지만 유저 데이터를 가져오는데 실패했습니다.');
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

  return useMutation<LogoutResponse, AxiosError>({
    mutationFn: logout,
    onSuccess: () => {
      logoutAuthStore();
      alert('로그아웃 되었습니다.');

      // 로그아웃 시 홈 페이지로 리다이렉트
      window.location.href = '/';

      // 뒤로가기 방지
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = function () {
        window.history.pushState(null, '', window.location.href);
      };
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export const useSendEmailCode = () => {
  return useMutation<SendEmailCodeResponse, AxiosError, SendEmailCodeRequest>({
    mutationFn: sendEmailCode,
    onSuccess: () => {
      alert('인증번호가 전송되었습니다.');
    },
    onError: (error) => {
      console.error('인증번호 발송 실패:', error);
      alert('인증번호 발송에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export const useVerifyAuthCode = () => {
  return useMutation<VerifyAuthCodeResponse, AxiosError, VerifyAuthCodeRequest>({
    mutationFn: verifyAuthCode,
    onError: (error) => {
      console.error('인증번호 인증 실패:', error);
      alert('인증번호 인증에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, AxiosError, ResetPasswordRequest>({
    mutationFn: resetPassword,
    onError: (error) => {
      console.error('비밀번호 재설정 실패:', error);
      if (error instanceof AxiosError) {
        alert(error.message);
      } else {
        alert('비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.');
      }
    },
  });
};

export const useCheckEmailExists = () => {
  return useMutation<EmailExistsResponse, AxiosError, string>({
    mutationFn: checkEmailExists,

    onError: (error) => {
      console.error('이메일 중복검사 실패:', error);
      if (error instanceof AxiosError) {
        alert(error.message);
      } else {
        alert('이메일 중복검사에 실패했습니다. 다시 시도해 주세요.');
      }
    },
  });
};

export const useSignup = () => {
  return useMutation<SignupResponse, AxiosError, SignupRequest>({
    mutationFn: signup,
    onError: (error) => {
      console.error('회원가입 실패:', error);
      if (error instanceof AxiosError) {
        alert(error.message);
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    },
  });
};
