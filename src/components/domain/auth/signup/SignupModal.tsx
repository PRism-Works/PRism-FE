import { cn } from '@/lib/utils';
import { useId, useState, useReducer } from 'react';
import { useModalStore } from '@/stores/modalStore';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTimer } from '@/hooks/useTimer';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema, SignupForm } from '@/models/auth/authModels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/common/input/PasswordInput';
import { formatSecondToMMSS } from '@/lib/dateTime';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ModalLayout from '@/components/common/modal/ModalLayout';
import AgreementCheckbox from '../privacyPolicy/AgreementCheckbox';
import SignupPrivacyPolicyModal from '../privacyPolicy/SignupPrivacyPolicyModal';
import SignupEmailConsentModal from '../privacyPolicy/SignupEmailConsentModal';
import {
  useCheckEmailExists,
  useSendEmailCode,
  useSignup,
  useVerifyAuthCode,
} from '@/hooks/queries/useAuthService';
import LoginModal from '../login/LoginModal';

export default function SignupModal() {
  const id = useId();
  const isSmallScreen = useMediaQuery('(max-width: 430px)');
  const { openModal, closeModal } = useModalStore();

  // mutation
  const checkEmailExistMutation = useCheckEmailExists();
  const signupMutation = useSignup();
  const sendCodeMutation = useSendEmailCode(() => {});
  const verifyCodeMutation = useVerifyAuthCode(() => {});

  const [isAgreed, setIsAgreed] = useReducer((state: boolean) => !state, false); // 약관 동의 여부
  const [isEmailExistChecked, setIsEmailExistChecked] = useState<boolean>(false); // 이메일 중복 확인 완료 상태
  const [isCertified, setIsCertified] = useState<boolean>(false); // 인증코드 확인 완료 상태
  const [isCodeSended, setIsCodeSended] = useState<boolean>(false); // 인증코드 전송 완료 상태

  const handleTimerEnd = () => {
    setIsCodeSended(false);
    formMethods.setValue('certification', '');
    alert('인증시간이 만료되었습니다. 다시 시도해주세요.');
  };

  const { timeLeft, startTimer, isRunning } = useTimer(300, handleTimerEnd);

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
  const handleCheckEmailExist = async () => {
    const email = getValues('email');
    try {
      const response = await checkEmailExistMutation.mutateAsync(email);
      const isExistEmail = response.data;
      if (isExistEmail) {
        setError('email', {
          type: 'manual',
          message: '이미 존재하는 이메일입니다. 다른 이메일로 시도해 주세요.',
        });
        setIsEmailExistChecked(false);
      } else {
        clearErrors('email');
        setIsEmailExistChecked(true);
        alert('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      setError('email', { type: 'manual', message: '이메일 중복 확인 중 오류가 발생했습니다.' });
    }
  };

  // 인증번호 전송
  const handleSendEmailCode = async () => {
    const email = getValues('email');
    try {
      await sendCodeMutation.mutateAsync({ email, authType: 'SIGNUP' });
      // 인증번호 전송에 성공하면, 타이머 시작
      setIsCodeSended(true);
      startTimer();
    } catch (error) {
      console.error(`인증번호 받기 실패: ${error}`);
    }
  };

  // 인증번호 확인
  const handleVerifyAuthCode = async () => {
    const email = getValues('email');
    const authCode = getValues('certification');
    try {
      await verifyCodeMutation.mutateAsync({ email, authCode, authType: 'SIGNUP' });
      setIsCertified(true);
    } catch (error) {
      setError('certification', { type: 'manual', message: '인증코드가 일치하지 않습니다.' });
      console.error(`인증 코드 확인 실패: ${error}`);
    }
  };

  // 회원가입 제출
  const onSubmit = async (data: SignupForm) => {
    try {
      await signupMutation.mutateAsync({
        username: data.name,
        email: data.email,
        authCode: data.certification,
        password: data.password,
      });
      alert('회원가입이 성공적으로 완료되었습니다!');

      closeModal();
      setTimeout(() => {
        openModal(<LoginModal />);
      }, 200);
    } catch (error) {
      console.error(`회원가입 실패: ${error}`);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const email = watch('email');
  const certification = watch('certification');

  const isEmailValid = !errors.email && email.length > 0;
  const isAuthCodeValid = !errors.certification && certification.length > 0;

  // 라벨 텍스트 스타일 (반응형)
  const labelStyle = isSmallScreen ? 'mobile2' : 'mobile1';

  return (
    <ModalLayout
      contentClassName="max-w-[500px]"
      title="회원가입"
      footer={
        <ModalLayout.ConfirmButton
          title="회원가입하기"
          isSmallScreen={isSmallScreen}
          onClick={handleSubmit(onSubmit)}
          pending={signupMutation.isPending}
          disabled={!isValid || !isAgreed || !isCertified || !isEmailExistChecked}
        />
      }>
      <Form {...formMethods}>
        <form className="mt-8 gap-8 flex-col-center" onSubmit={handleSubmit(onSubmit)}>
          {/* 이름 */}
          <div className="w-full">
            <FormField
              control={formMethods.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className={cn('text-black', labelStyle)}>이름</FormLabel>
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
                  <FormMessage className="absolute -bottom-5 left-0">
                    {errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          {/* 이메일 주소 */}
          <div className="w-full">
            <FormField
              control={formMethods.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className={cn('text-black', labelStyle)}>이메일 주소</FormLabel>
                  <div className="flex flex-col items-center justify-between sm:flex-row">
                    <FormControl>
                      <Input
                        type="email"
                        id={`${id}-signup-email`}
                        placeholder="prism12@gmail.com"
                        {...field}
                        disabled={isEmailExistChecked} // 이메일 중복 확인이 끝나면 수정 불가
                        className="w-full flex-grow sm:w-auto"
                        autoComplete="username"
                      />
                    </FormControl>
                    {isEmailExistChecked ? (
                      // 이메일 중복 체크가 완료된 경우, '인증번호 받기' 버튼을 렌더링
                      <Button
                        type="button"
                        className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                        onClick={handleSendEmailCode}
                        pending={sendCodeMutation.isPending}
                        disabled={isCodeSended}>
                        인증번호 받기
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                        disabled={!isEmailValid}
                        onClick={handleCheckEmailExist}
                        pending={checkEmailExistMutation.isPending}>
                        중복확인
                      </Button>
                    )}
                  </div>
                  <FormMessage className="absolute -bottom-5">{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          {/* 인증번호 */}
          <div className="w-full">
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
                          type="text"
                          id={`${id}-signup-certification`}
                          placeholder="이메일로 전송된 인증번호를 입력해 주세요."
                          {...field}
                          className="w-full pr-12"
                          disabled={isCertified}
                          autoComplete="off"
                        />
                        {isCodeSended && !isCertified && isRunning && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-danger-500">
                            {formatSecondToMMSS(timeLeft)}
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <Button
                      type="button"
                      className="mt-2 h-[45px] w-full bg-purple-500 display6 hover:bg-purple-600 sm:ml-2 sm:mt-0 sm:w-auto"
                      disabled={
                        !isCodeSended || !isAuthCodeValid || isCertified || !isEmailExistChecked
                      }
                      onClick={handleVerifyAuthCode}
                      pending={verifyCodeMutation.isPending}>
                      인증하기
                    </Button>
                  </div>
                  {isCertified && (
                    <p className="absolute -bottom-5 text-success-500 caption">
                      인증이 완료되었습니다!
                    </p>
                  )}
                  <FormMessage className="absolute -bottom-5">
                    {errors.certification?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          {/* 비밀번호 */}
          <div className="w-full">
            <FormField
              control={formMethods.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className={cn('text-black', labelStyle)}>비밀번호</FormLabel>
                  <FormControl>
                    <PasswordInput
                      id={`${id}-signup-password`}
                      placeholder="비밀번호"
                      {...field}
                      className="w-full"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-5">
                    {errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          {/* 비밀번호 확인 */}
          <div className="w-full">
            <FormField
              control={formMethods.control}
              name="verifyPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className={cn('text-black', labelStyle)}>비밀번호 확인</FormLabel>
                  <FormControl>
                    <PasswordInput
                      id={`${id}-signup-verify-password`}
                      placeholder="비밀번호 확인"
                      {...field}
                      className="w-full"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-5">
                    {errors.verifyPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <AgreementCheckbox
            isAgreed={isAgreed}
            onToggle={setIsAgreed}
            isSmallScreen={false}
            text="필수동의 항목 및"
            privacyPolicyText="개인정보 수집 및 이용 동의"
            onPrivacyPolicyClick={() => openModal(<SignupPrivacyPolicyModal />)}
            termsOfServiceText="이메일 정보 수신"
            onTermsOfServiceClick={() => openModal(<SignupEmailConsentModal />)}
          />
        </form>
      </Form>
    </ModalLayout>
  );
}
