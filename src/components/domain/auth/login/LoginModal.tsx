'use client';

import React, { useId } from 'react';
import ModalLayout from '@/components/modal/ModalLayout';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/common/input/PasswordInput';

export default function LoginModal() {
  const id = useId();
  const isSmallScreen = useMediaQuery('(max-width: 430px)');

  return (
    <ModalLayout
      title="로그인"
      footer={<ModalLayout.ConfirmButton title="로그인" isSmallScreen={isSmallScreen} />}>
      <div className="mt-12 grid w-full max-w-[420px] items-center gap-1">
        <Label
          className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
          htmlFor={`${id}-login-email`}>
          이메일 주소
        </Label>
        <Input
          type="email"
          id={`${id}-login-email`}
          placeholder="prism12@gmail.com"
          className="w-full"
        />
      </div>
      <div className="my-8 grid w-full max-w-[420px] items-center gap-1">
        <Label
          className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
          htmlFor={`${id}-login-password`}>
          비밀번호
        </Label>
        <PasswordInput id={`${id}-login-password`} placeholder="비밀번호" className="w-full" />
      </div>
      <div className={`w-full max-w-[420px] ${isSmallScreen ? 'mobile2' : 'mobile1'}`}>
        <div className="flex items-center justify-between">
          <span className="ml-2 text-gray-800">아이디가 없으신가요?</span>
          <Button
            variant="link"
            className="w-full max-w-[100px] text-right text-info underline mobile1">
            회원가입하기
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="-mt-2 ml-2 text-gray-400">비밀번호를 잊으셨나요?</span>
          <Button
            variant="link"
            className="-mt-2 w-full max-w-[100px] text-right text-gray-400 underline mobile1">
            비밀번호찾기
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
