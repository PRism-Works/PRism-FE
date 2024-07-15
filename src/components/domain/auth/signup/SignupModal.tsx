'use client';

import { useId, useState, useReducer } from 'react';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema, SignupForm } from '@/models/authModels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/common/input/PasswordInput';
import { useTimer } from '@/hooks/useTimer';
import { formatTime } from '@/lib/utils';
import { checkEmailExists } from '@/apis/auth'; // Email 중복 검사 API
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleTimerEnd = () => {
    setIsButtonDisabled(false);
  };

  const { timeLeft, startTimer } = useTimer(10, handleTimerEnd);

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isCertified, setIsCertified] = useState(false);

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
    getValues,
    setError,
    clearErrors,
  } = formMethods;

  const onSubmit = (data: SignupForm) => {
    alert(JSON.stringify(data));
  };

  const handleCheckEmail = async () => {
    const email = getValues('email');
    try {
      const response = await checkEmailExists(email);
      if (response.data) {
        setError('email', {
          type: 'manual',
          message: '이미 존재하는 이메일입니다. 다른 이메일로 시도해 주세요.',
        });
      } else {
        clearErrors('email');
        setIsEmailChecked(true);
        alert('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      setError('email', { type: 'manual', message: '이메일 확인 중 오류가 발생했습니다.' });
    }
  };

  const email = watch('email');
  const certification = watch('certification');

  const isEmailValid = !errors.email && email.length > 0;
  const isCertificationValid = !errors.certification && certification.length === 4;

  return (
    <ModalLayout
      contentClassName="max-w-[500px]"
      title="회원가입"
      footer={
        <ModalLayout.ConfirmButton
          title="회원가입하기"
          isSmallScreen={isSmallScreen}
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || !isAgreed || !isCertified}
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
                        disabled={timeLeft > 0}
                        className="w-full flex-grow sm:w-auto"
                      />
                    </FormControl>
                    {isEmailChecked ? (
                      <Button
                        className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                        disabled={!isEmailValid || timeLeft > 0 || isButtonDisabled}
                        onClick={() => {
                          setIsButtonDisabled(true);
                          startTimer();
                          // NOTE: 인증번호 받기 API 호출 로직 추가 예정
                        }}>
                        인증번호 받기
                      </Button>
                    ) : (
                      <Button
                        className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                        disabled={!isEmailValid}
                        onClick={handleCheckEmail}>
                        중복확인
                      </Button>
                    )}
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
                          maxLength={4}
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
                      disabled={!isCertificationValid}
                      onClick={() => setIsCertified(true)}>
                      인증하기
                    </Button>
                  </div>
                  {isCertified && (
                    <p className="text-success-500 caption">인증이 완료되었습니다!</p>
                  )}
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
