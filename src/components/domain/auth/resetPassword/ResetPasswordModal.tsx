'use client';

import { useId, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useModalStore } from '@/stores/modalStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTimer } from '@/hooks/useTimer';
import { ResetPasswordSchema, ResetPasswordForm } from '@/models/auth/authModels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/common/input/PasswordInput';
import { formatSecondToMMSS } from '@/lib/dateTime';
import {
  useSendEmailCode,
  useVerifyAuthCode,
  useResetPassword,
} from '@/hooks/queries/useAuthService';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ModalLayout from '@/components/common/modal/ModalLayout';
import LoginModal from '../login/LoginModal';
import { cn } from '@/lib/utils';

export default function ResetPasswordModal() {
  const id = useId();
  const isSmallScreen = useMediaQuery('(max-width: 430px)');
  const { openModal, closeModal } = useModalStore();

  // mutation
  const sendEmailCodeMutation = useSendEmailCode();
  const verifyAuthCodeMutation = useVerifyAuthCode();
  const resetPasswordMutation = useResetPassword();

  const [isCertified, setIsCertified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false); // 인증코드 전송 완료 상태

  const handleTimerEnd = () => {
    setIsCodeSent(false);
    setValue('certification', '');
  };

  const { timeLeft, startTimer, isRunning } = useTimer(300, handleTimerEnd);

  const formMethods = useForm<ResetPasswordForm>({
    mode: 'onChange',
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
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
    setValue,
    getValues,
    setError,
  } = formMethods;

  const email = watch('email');
  const certification = watch('certification');

  const isEmailValid = !errors.email && email.length > 0;
  const isAuthCodeValid = !errors.certification && certification.length > 0;

  // 인증번호 전송
  const handleSendEmailCode = async () => {
    const email = getValues('email');
    try {
      await sendEmailCodeMutation.mutateAsync({
        email,
        authType: 'RESET_PASSWORD',
      });
      // 인증번호 전송에 성공하면, 타이머 시작
      setIsCodeSent(true);
      startTimer();
    } catch (error) {
      console.error('인증번호 발송 실패:', error);
    }
  };

  // 인증번호 확인
  const handleVerifyAuthCode = async () => {
    const email = getValues('email');
    const authCode = getValues('certification');
    try {
      await verifyAuthCodeMutation.mutateAsync({
        email,
        authCode,
        authType: 'RESET_PASSWORD',
      });
      setIsCertified(true);
    } catch (error) {
      setError('certification', { type: 'manual', message: '인증코드가 일치하지 않습니다.' });
      console.error('인증코드 확인 실패:', error);
    }
  };

  // 비밀번호 재설정
  const onResetPasswordSubmit = async (data: ResetPasswordForm) => {
    try {
      await resetPasswordMutation.mutateAsync({
        email: data.email,
        authCode: data.certification,
        password: data.newPassword,
      });
      closeModal();
      alert('비밀번호가 성공적으로 재설정되었습니다.');
      setTimeout(() => {
        openModal(<LoginModal />);
      }, 200);
    } catch (error) {
      console.error('비밀번호 재설정 실패:', error);
    }
  };

  // 라벨 텍스트 스타일 (반응형)
  const labelStyle = isSmallScreen ? 'mobile2' : 'mobile1';

  return (
    <ModalLayout
      contentClassName="max-w-[500px]"
      title="비밀번호 재설정"
      footer={
        <ModalLayout.ConfirmButton
          title="비밀번호 변경하기"
          isSmallScreen={isSmallScreen}
          onClick={handleSubmit(onResetPasswordSubmit)}
          disabled={!isValid || !isCertified}
          pending={resetPasswordMutation.isPending}
        />
      }>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onResetPasswordSubmit)}>
          <div className="mt-12 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className={cn('text-black', labelStyle)}>이메일 주소</FormLabel>
                  <div className="flex flex-col items-center justify-between sm:flex-row">
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        id={`${id}-reset-password-email`}
                        placeholder="prism12@gmail.com"
                        className="w-full flex-grow sm:w-auto"
                        disabled={isCodeSent || sendEmailCodeMutation.isPending}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                      disabled={isCodeSent || !isEmailValid}
                      pending={sendEmailCodeMutation.isPending}
                      onClick={handleSendEmailCode}>
                      인증번호 받기
                    </Button>
                  </div>
                  <FormMessage className="text-danger-500 absolute">
                    {errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-10 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="certification"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className={cn('text-black', labelStyle)}>인증번호</FormLabel>
                  <div className="flex flex-col items-center justify-between sm:flex-row">
                    <FormControl>
                      <div className="relative w-full flex-grow sm:w-auto">
                        <Input
                          {...field}
                          type="text"
                          id={`${id}-reset-password-certification`}
                          placeholder="이메일로 전송된 인증번호를 입력해 주세요."
                          className="w-full pr-12"
                          disabled={isCertified}
                        />
                        {isCodeSent && !isCertified && isRunning && (
                          <span className="text-danger-500 absolute right-3 top-1/2 -translate-y-1/2 transform">
                            {formatSecondToMMSS(timeLeft)}
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <Button
                      type="button"
                      className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                      disabled={!isCodeSent || !isAuthCodeValid || isCertified || !isEmailValid}
                      pending={verifyAuthCodeMutation.isPending}
                      onClick={handleVerifyAuthCode}>
                      인증하기
                    </Button>
                  </div>
                  {isCertified && (
                    <p className="text-success-500 caption">인증이 완료되었습니다!</p>
                  )}
                  <FormMessage className="text-danger-500 absolute">
                    {errors.certification?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-10 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel
                    className={cn('text-black', labelStyle)}
                    htmlFor={`${id}-new-password`}>
                    새 비밀번호
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      id={`${id}-new-password`}
                      placeholder="비밀번호"
                      className="w-full"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage className="text-danger-500 absolute">
                    {errors.newPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="mb-6 mt-10 grid w-full max-w-[420px] items-center gap-1">
            <FormField
              control={formMethods.control}
              name="verifyNewPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel
                    className={cn('text-black', labelStyle)}
                    htmlFor={`${id}-verify-new-password`}>
                    비밀번호 확인
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      id={`${id}-verify-new-password`}
                      placeholder="비밀번호 확인"
                      className="w-full"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage className="text-danger-500 absolute">
                    {errors.verifyNewPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </ModalLayout>
  );
}
