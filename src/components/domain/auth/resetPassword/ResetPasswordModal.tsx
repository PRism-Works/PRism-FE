'use client';

import React, { useId, useState, useEffect } from 'react';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema, ResetPasswordForm } from '@/models/authModels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/common/input/PasswordInput';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function ResetPasswordModal() {
  const id = useId();
  const isSmallScreen = useMediaQuery('(max-width: 430px)');

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const formMethods = useForm<ResetPasswordForm>({
    mode: 'onChange',
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      name: '',
      email: '',
      certification: '',
      newPassword: '',
      verifyNewPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = formMethods;

  // NOTE: api 연동하면서 수정할 예정입니다.
  const onSubmit = (data: ResetPasswordForm) => {
    alert(JSON.stringify(data));
  };

  const email = watch('email');
  const certification = watch('certification');

  const isEmailValid = !errors.email && email.length > 0;
  const isCertificationValid = !errors.certification && certification.length === 4;

  const handleGetCertification = () => {
    setTimeLeft(300);
    if (timerId) clearInterval(timerId);

    const newTimerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(newTimerId);
          // 타이머가 종료되면 이메일 주소 입력 필드와 인증번호 받기 버튼을 활성화
          setTimerId(null);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimerId(newTimerId);
  };

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <ModalLayout
      contentClassName="max-w-[500px]"
      title="비밀번호 재설정"
      footer={
        <ModalLayout.ConfirmButton
          title="비밀번호 변경하기"
          isSmallScreen={isSmallScreen}
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      }>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}>
                    이름
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id={`${id}-reset-password-name`}
                      placeholder="이름"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}>
                    이메일 주소
                  </FormLabel>
                  <div className="flex flex-col items-center justify-between sm:flex-row">
                    <FormControl>
                      <Input
                        type="email"
                        id={`${id}-reset-password-email`}
                        placeholder="prism12@gmail.com"
                        {...field}
                        className="w-full flex-grow sm:w-auto"
                        // 타이머가 동작 중일 때는 이메일 입력 필드를 비활성화
                        disabled={timerId !== null}
                      />
                    </FormControl>
                    <Button
                      className="h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                      disabled={!isEmailValid || timerId !== null} // 타이머가 동작 중일 때는 버튼을 비활성화
                      onClick={handleGetCertification}>
                      인증번호 받기
                    </Button>
                  </div>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="certification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}>
                    인증번호
                  </FormLabel>
                  <div className="flex flex-col items-center justify-between sm:flex-row">
                    <FormControl>
                      <div className="relative w-full flex-grow sm:w-auto">
                        <Input
                          type="text"
                          id={`${id}-reset-password-certification`}
                          placeholder="0000"
                          {...field}
                          className="w-full pr-12"
                        />
                        {timeLeft > 0 && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-danger-500">
                            {formatTime(timeLeft)}
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <Button
                      className="h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                      disabled={!isCertificationValid}>
                      인증하기
                    </Button>
                  </div>
                  <FormMessage>{errors.certification?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
                    htmlFor={`${id}-new-password`}>
                    새 비밀번호
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      id={`${id}-new-password`}
                      placeholder="비밀번호"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage>{errors.newPassword?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4 mt-8 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="verifyNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
                    htmlFor={`${id}-verify-new-password`}>
                    비밀번호 확인
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      id={`${id}-verify-new-password`}
                      placeholder="비밀번호 확인"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage>{errors.verifyNewPassword?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </ModalLayout>
  );
}
