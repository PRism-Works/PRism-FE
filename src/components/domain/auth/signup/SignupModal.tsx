'use client';

import React, { useId, useState, useEffect, useReducer } from 'react';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema, SignupForm } from '@/models/authModels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/common/input/PasswordInput';
import { CheckCircle2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function SignupModal() {
  const id = useId();
  const isSmallScreen = useMediaQuery('(max-width: 430px)');
  const [isAgreed, setIsAgreed] = useReducer((state) => !state, false);

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const formMethods = useForm<SignupForm>({
    mode: 'onChange',
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      certification: '',
      password: '',
      verifyPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = formMethods;

  // NOTE: alert는 api 연동하면서 수정할 예정입니다. 현재는 data를 담고 있습니다.
  const onSubmit = (data: SignupForm) => {
    alert(JSON.stringify(data));
  };

  const email = watch('email');
  const certification = watch('certification');

  const isEmailValid = !errors.email && email.length > 0;
  const isCertificationValid = !errors.certification && certification.length === 4;

  const handleGetCertification = () => {
    // 타이머를 5분(300초)으로 설정
    setTimeLeft(300);
    if (timerId) clearInterval(timerId);

    const newTimerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(newTimerId);
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
      title="회원가입"
      footer={
        <ModalLayout.ConfirmButton
          title="회원가입하기"
          isSmallScreen={isSmallScreen}
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || !isAgreed}
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
                      id={`${id}-signup-name`}
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
                        id={`${id}-signup-email`}
                        placeholder="prism12@gmail.com"
                        {...field}
                        className="w-full flex-grow sm:w-auto"
                      />
                    </FormControl>
                    <Button
                      className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                      disabled={!isEmailValid}
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
                          id={`${id}-signup-certification`}
                          placeholder="이메일로 전송된 인증번호를 입력해 주세요."
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
                      className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}>
                    비밀번호
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      id={`${id}-signup-password`}
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

          <div className="mb-6 mt-6 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="verifyPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}>
                    비밀번호 확인
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      id={`${id}-signup-verify-password`}
                      placeholder="비밀번호 확인"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage>{errors.verifyPassword?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className={`w-full max-w-[420px] ${isSmallScreen ? 'caption' : 'display5'}`}>
            <div className="flex items-center justify-between">
              <div className="mr-3" onClick={setIsAgreed}>
                <CheckCircle2
                  className={`h-7 w-7 cursor-pointer stroke-[1.5px] ${
                    isAgreed ? 'text-purple-500' : 'text-gray-400'
                  }`}
                />
              </div>

              <p className="text-sm text-muted-foreground md:text-left">
                필수동의 항목 및{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer text-info underline underline-offset-4">
                  개인정보 수집 및 이용 동의
                </a>{' '}
                및{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer text-info underline underline-offset-4">
                  이메일 정보 수신
                </a>
                에 모두 동의합니다.
              </p>
            </div>
          </div>
        </form>
      </Form>
    </ModalLayout>
  );
}
