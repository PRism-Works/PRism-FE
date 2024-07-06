'use client';

import React from 'react';
import ConfirmModal from '@/components/modal/confirmModal/ConfirmModal';
import { useModalStore } from '@/stores/modalStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/input/PasswordInput';
import { CheckCircle2 } from 'lucide-react';

export default function SignupModal() {
  const openModal = useModalStore((state) => state.openModal);
  const isSmallScreen = useMediaQuery('(max-width: 430px)');

  const handleOpen = () => {
    openModal(
      <ConfirmModal
        title="회원가입"
        footer={
          <Button
            className={`mt-6 h-[55px] w-full max-w-[420px] rounded-[10px] bg-purple-200 px-[24px] py-[16px] text-white body7 hover:bg-purple-400`}>
            회원가입하기
          </Button>
        }>
        <div className="mt-8 grid w-full max-w-[420px] items-center gap-1">
          <Label
            className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
            htmlFor="signup-name">
            이름
          </Label>
          <Input type="text" id="signup-name" placeholder="이름" className="w-full" />
        </div>
        <div className="mt-6 grid w-full max-w-[420px] items-center gap-1">
          <Label
            className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
            htmlFor="signup-email">
            이메일 주소
          </Label>
          <div className="mb-2 flex flex-col items-center justify-between sm:flex-row">
            <Input
              type="email"
              id="signup-email"
              placeholder="prism12@gmail.com"
              className="w-full flex-grow sm:w-auto"
            />
            <Button className="mt-2 h-[45px] w-full bg-purple-200 mobile1 hover:bg-purple-400 sm:ml-2 sm:mt-0 sm:w-auto">
              중복확인
            </Button>
          </div>
        </div>
        <div className="mt-4 grid w-full max-w-[420px] items-center gap-1">
          <Label
            className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
            htmlFor="signup-certification">
            인증번호
          </Label>
          <div className="mb-2 flex flex-col items-center justify-between sm:flex-row">
            <Input
              type="text"
              id="signup-certification"
              placeholder="0000"
              className="w-full flex-grow sm:w-auto"
            />
            <Button className="mt-2 h-[45px] w-full bg-purple-200 mobile1 hover:bg-purple-400 sm:ml-2 sm:mt-0 sm:w-auto">
              인증하기
            </Button>
          </div>
        </div>

        <div className="mt-4 grid w-full max-w-[420px] items-center gap-1">
          <Label
            className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
            htmlFor="signup-password">
            비밀번호
          </Label>
          <PasswordInput id="signup-password" placeholder="비밀번호" className="w-full" />
        </div>

        <div className="mb-5 mt-6 grid w-full max-w-[420px] items-center gap-1">
          <Label
            className={`text-black ${isSmallScreen ? 'mobile2' : 'mobile1'}`}
            htmlFor="signup-verify-password">
            비밀번호 확인
          </Label>
          <PasswordInput
            id="signup-verify-password"
            placeholder="비밀번호 확인"
            className="w-full"
          />
        </div>

        <div className={`w-full max-w-[420px] ${isSmallScreen ? 'caption' : 'display5'}`}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <CheckCircle2 className="h-7 w-7 cursor-pointer text-gray-400" />
            </div>
            <div>
              필수동의 항목 및 개인정보 수집 및 이용 동의 및 이메일 정보 수신에 모두 동의합니다.
            </div>
          </div>
        </div>
      </ConfirmModal>,
    );
  };

  return (
    <span className="cursor-pointer" onClick={handleOpen}>
      회원가입
    </span>
  );
}
