'use client';

import React from 'react';
import ConfirmModal from '@/components/modal/confirmModal/ConfirmModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useModalStore } from '@/stores/modalStore';
import { CheckCircle2 } from 'lucide-react';

export default function SignupModal() {
  const openModal = useModalStore((state) => state.openModal);

  const handleOpen = () => {
    openModal(
      <ConfirmModal title="회원가입">
        <div className="mt-7 grid w-full max-w-sm items-center gap-1">
          <Label className="text-black body6" htmlFor="name">
            이름
          </Label>
          <Input type="name" id="name" placeholder="이름" className="w-[420px]" />
        </div>
        <div className="mt-7 grid w-full max-w-sm items-center gap-1">
          <Label className="text-black body6" htmlFor="email">
            이메일 주소
          </Label>
          <div className="mb-2 flex items-center justify-between">
            <Input type="email" id="email" placeholder="prism12@gmail.com" className="w-[300px]" />
            <Button className="ml-2 h-[50px] w-[114px] bg-purple-200 display2 hover:bg-purple-400">
              중복확인
            </Button>
          </div>
        </div>
        <div className="my-7 grid w-full max-w-sm items-center gap-1">
          <Label className="text-black body6" htmlFor="certification number">
            인증번호
          </Label>
          <div className="mb-2 flex items-center justify-between">
            <Input
              type="number"
              id="certification number"
              placeholder="0000"
              className="w-[300px]"
            />
            <Button className="ml-2 h-[50px] w-[114px] bg-purple-200 display2 hover:bg-purple-400">
              인증하기
            </Button>
          </div>
        </div>
        <div className="my-7 grid w-full max-w-sm items-center gap-1">
          <Label className="text-black body6" htmlFor="password">
            비밀번호
          </Label>
          <Input type="password" id="password" placeholder="비밀번호" className="w-[420px]" />
        </div>
        <div className="my-7 grid w-full max-w-sm items-center gap-1">
          <Label className="text-black body6" htmlFor="verify password">
            비밀번호 확인
          </Label>
          <Input
            type="password"
            id="verify password"
            placeholder="비밀번호 확인"
            className="w-[420px]"
          />
        </div>
        <div className="display1">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <CheckCircle2 className="h-[30px] w-[30px] text-gray-400" />
            </div>
            <div>
              필수동의 항목 및 개인정보 수집 및 이용 동의 및 이메일 정보 수신에 모두 동의합니다.
            </div>
          </div>
        </div>
        <Button className="mt-7 h-[64px] w-[420px] rounded-[10px] bg-purple-200 px-[24px] py-[16px] text-white body1 hover:bg-purple-400">
          회원가입하기
        </Button>
      </ConfirmModal>,
    );
  };

  return (
    <span className="cursor-pointer" onClick={handleOpen}>
      회원가입
    </span>
  );
}
