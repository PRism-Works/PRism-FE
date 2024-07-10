'use client';

import React, { useId } from 'react';
import ModalLayout from '@/components/modal/ModalLayout';
import { useModalStore } from '@/stores/modalStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginForm } from '@/models/authModels';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/common/input/PasswordInput';
import SignupModal from '../signup/SignupModal';

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

  // NOTE: alert는 api 연동하면서 수정할 예정입니다. 현재는 data를 담고 있습니다.
  const onSubmit = (data: LoginForm) => {
    alert(JSON.stringify(data));
  };

  const handleOpenSignupModal = () => {
    closeModal();
    openModal(<SignupModal />);
  };

  return (
    <FormProvider {...formMethods}>
      <ModalLayout
        title="로그인"
        footer={
          <ModalLayout.ConfirmButton
            title="로그인"
            isSmallScreen={isSmallScreen}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        }>
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
                className={`-mt-2 w-full max-w-[100px] text-right text-gray-400 underline ${isSmallScreen ? 'mobile2' : 'mobile1'}`}>
                비밀번호찾기
              </Button>
            </div>
          </div>
        </form>
      </ModalLayout>
    </FormProvider>
  );
}
