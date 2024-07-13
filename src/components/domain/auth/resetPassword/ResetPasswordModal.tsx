'use client';

import React, { useId } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/common/input/PasswordInput';
import ModalLayout from '@/components/common/modal/ModalLayout';

export default function ResetPasswordModal() {
  const id = useId();
  const isSmallScreen = useMediaQuery('(max-width: 430px)');

  return (
    <ModalLayout
      contentClassName="max-w-[500px]"
      title="비밀번호 재설정"
      footer={
        <ModalLayout.ConfirmButton title="비밀번호 변경하기" isSmallScreen={isSmallScreen} />
      }>
      <div className="mt-10 grid w-full max-w-[420px] items-center gap-1">
        <Label
          className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
          htmlFor={`${id}-signup-name`}>
          이름
        </Label>
        <Input type="text" id={`${id}-signup-name`} placeholder="이름" className="w-full" />
      </div>
      <div className="mt-8 grid w-full max-w-[420px] items-center gap-1">
        <Label
          className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
          htmlFor={`${id}-signup-email`}>
          이메일 주소
        </Label>
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <Input
            type="email"
            id={`${id}-signup-email`}
            placeholder="prism12@gmail.com"
            className="w-full flex-grow sm:w-auto"
          />
          <Button className="mt-2 h-[45px] w-full bg-purple-200 mobile1 hover:bg-purple-400 sm:ml-2 sm:mt-0 sm:w-auto">
            인증번호 받기
          </Button>
        </div>
      </div>
      <div className="mt-8 grid w-full max-w-[420px] items-center gap-1">
        <Label
          className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
          htmlFor={`${id}-signup-certification`}>
          인증번호
        </Label>
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <Input
            type="text"
            id={`${id}-signup-certification`}
            placeholder="0000"
            className="w-full flex-grow sm:w-auto"
          />
          <Button className="mt-2 h-[45px] w-full bg-purple-200 mobile1 hover:bg-purple-400 sm:ml-2 sm:mt-0 sm:w-auto">
            인증하기
          </Button>
        </div>
      </div>

      <div className="mt-8 grid w-full max-w-[420px] items-center gap-1">
        <Label
          className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
          htmlFor={`${id}-signup-password`}>
          새 비밀번호
        </Label>
        <PasswordInput id={`${id}-signup-password`} placeholder="비밀번호" className="w-full" />
      </div>

      <div className="mb-4 mt-8 grid w-full max-w-[420px] items-center gap-1">
        <Label
          className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
          htmlFor={`${id}-signup-verify-password`}>
          비밀번호 확인
        </Label>
        <PasswordInput
          id={`${id}-signup-verify-password`}
          placeholder="비밀번호 확인"
          className="w-full"
        />
      </div>
    </ModalLayout>
  );
}
