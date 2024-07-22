'use client';

import { useId, useState, useReducer } from 'react';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema, SignupForm } from '@/models/auth/authModels';
import { checkEmailExists, sendEmailCode, verifyAuthCode, signup } from '@/services/api/authApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/common/input/PasswordInput';
import { useTimer } from '@/hooks/useTimer';
import { formatSecondToMMSS } from '@/lib/dateTime';
import { CheckCircle2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface SignupModalProps {
  onSuccess?: () => void;
  afterClose?: () => void;
}

export default function SignupModal({ onSuccess, afterClose }: SignupModalProps) {
  const id = useId();
  const isSmallScreen = useMediaQuery('(max-width: 430px)');
  const [isAgreed, setIsAgreed] = useReducer((state: boolean) => !state, false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isEmailChecking, setIsEmailChecking] = useState<boolean>(false); // 이메일 중복 확인 요청 상태
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false); // 이메일 중복 확인 완료 상태
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false); // 인증번호 전송 상태
  const [isVerifyingCode, setIsVerifyingCode] = useState<boolean>(false); // 인증코드 확인 요청 상태
  const [isCertified, setIsCertified] = useState<boolean>(false); // 인증코드 확인 완료 상태
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // 회원가입 요청 상태

  const handleTimerEnd = () => {
    setIsButtonDisabled(false);
    formMethods.setValue('certification', '');
  };

  const { timeLeft, startTimer } = useTimer(300, handleTimerEnd);

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

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    const email = getValues('email');
    setIsEmailChecking(true);
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
    } finally {
      setIsEmailChecking(false);
    }
  };

  // 인증번호 전송
  const handleSendEmailCode = async () => {
    const email = getValues('email');
    setIsSendingCode(true);
    try {
      await sendEmailCode({ email, authType: 'SIGNUP' });
      startTimer();
    } catch (error) {
      console.error(`인증번호 받기 실패: ${error}`);
    } finally {
      setIsSendingCode(false);
    }
  };

  // 인증번호 확인
  const handleVerifyAuthCode = async () => {
    const email = getValues('email');
    const authCode = getValues('certification');
    setIsVerifyingCode(true);
    try {
      const response = await verifyAuthCode({ email, authCode, authType: 'SIGNUP' });
      if (response.status === 200) {
        setIsCertified(true);
      }
    } catch (error) {
      setError('certification', { type: 'manual', message: '인증코드가 일치하지 않습니다.' });
      console.error(`인증 코드 확인 실패: ${error}`);
    } finally {
      setIsVerifyingCode(false);
    }
  };

  // 회원가입 제출
  const onSubmit = async (data: SignupForm) => {
    setIsSubmitting(true);
    try {
      const response = await signup({
        username: data.name,
        email: data.email,
        authCode: data.certification,
        password: data.password,
      });
      console.log('회원가입 성공:', response);
      alert('회원가입이 성공적으로 완료되었습니다!');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(`회원가입 실패: ${error}`);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const email = watch('email');
  const certification = watch('certification');

  const isEmailValid = !errors.email && email.length > 0;
  const isCertificationValid = !errors.certification && certification.length > 0; // 인증번호 길이 제한 제거

  return (
    <ModalLayout
      contentClassName="max-w-[500px]"
      title="회원가입"
      afterClose={afterClose}
      footer={
        <ModalLayout.ConfirmButton
          title="회원가입하기"
          isSmallScreen={isSmallScreen}
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || !isAgreed || !isCertified || !isEmailChecked || isSubmitting}
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
                      autoComplete="name"
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
                        autoComplete="username"
                      />
                    </FormControl>
                    {isEmailChecked ? (
                      <Button
                        className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                        disabled={timeLeft > 0 || isButtonDisabled}
                        onClick={() => {
                          setIsButtonDisabled(true);
                          handleSendEmailCode();
                        }}
                        pending={isSendingCode}>
                        인증번호 받기
                      </Button>
                    ) : (
                      <Button
                        className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                        disabled={!isEmailValid}
                        onClick={handleCheckEmail}
                        pending={isEmailChecking}>
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
                          className="w-full pr-12"
                          disabled={isCertified}
                          autoComplete="off"
                        />
                        {timeLeft > 0 && !isCertified && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-danger-500">
                            {formatSecondToMMSS(timeLeft)}
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <Button
                      className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                      disabled={!isCertificationValid || timeLeft === 0 || isCertified}
                      onClick={handleVerifyAuthCode}
                      pending={isVerifyingCode}>
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
                      autoComplete="new-password"
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
                      autoComplete="new-password"
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
