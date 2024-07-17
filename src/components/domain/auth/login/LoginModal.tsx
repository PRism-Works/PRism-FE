'use client';

import { useId } from 'react';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useModalStore } from '@/stores/modalStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginForm } from '@/models/auth/authModels';
import { login } from '@/services/api/authApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/common/input/PasswordInput';
import SignupModal from '../signup/SignupModal';
import ResetPasswordModal from '../resetPassword/ResetPasswordModal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import axios from 'axios';

export default function LoginModal() {
  const id = useId();
  const isSmallScreen = useMediaQuery('(max-width: 430px)');
  const { openModal, closeModal } = useModalStore();

  const formMethods = useForm<LoginForm>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = formMethods;

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data);
      const { accessToken, refreshToken } = response.data;

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      closeModal();
      alert('로그인에 성공했습니다.');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || '로그인 중 오류가 발생했습니다.';
        alert(errorMessage);
      } else {
        alert('로그인 중 오류가 발생했습니다.');
      }
    }
  };

  const handleOpenSignupModal = () => {
    closeModal();
    openModal(<SignupModal />);
  };

  const handleOpenResetPasswordModal = () => {
    closeModal();
    openModal(<ResetPasswordModal />);
  };

  return (
    <ModalLayout
      contentClassName="max-w-[500px]"
      title="로그인"
      footer={
        <ModalLayout.ConfirmButton
          title="로그인"
          isSmallScreen={isSmallScreen}
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      }>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-12 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}>
                    이메일 주소
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id={`${id}-login-email`}
                      placeholder="prism12@gmail.com"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="my-8 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}>
                    비밀번호
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      id={`${id}-login-password`}
                      placeholder="비밀번호"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className={`w-full max-w-[420px] ${isSmallScreen ? 'mobile2' : 'mobile1'}`}>
            <div className="flex items-center justify-between">
              <span className="ml-2 text-gray-800">아이디가 없으신가요?</span>
              <Button
                variant="link"
                className={`w-full max-w-[100px] text-right text-info underline ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
                onClick={handleOpenSignupModal}>
                회원가입하기
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="-mt-2 ml-2 text-gray-400">비밀번호를 잊으셨나요?</span>
              <Button
                variant="link"
                className={`-mt-2 w-full max-w-[100px] text-right text-gray-400 underline ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
                onClick={handleOpenResetPasswordModal}>
                비밀번호찾기
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </ModalLayout>
  );
}
