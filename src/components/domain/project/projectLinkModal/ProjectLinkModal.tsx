'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import BorderCard from '@/components/common/card/BorderCard';
import TagInput from '@/components/common/input/TagInput';
import MessageBox from '@/components/common/messgeBox/MessageBox';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { ComponentSpinner } from '@/components/common/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import CirclePlanetIcon from '../../user/CirclePlanetIcon';

import { useGetProfileProjectDetails, useLinkProject } from '@/hooks/queries/useProjectService';
import { useSendEmailCode, useVerifyAuthCode } from '@/hooks/queries/useAuthService';
import { useTimer } from '@/hooks/useTimer';

import { formatSecondToMMSS } from '@/lib/dateTime';
import { maskEmail, maskName } from '@/lib/masking';
import { cn } from '@/lib/utils';

import { useModalStore } from '@/stores/modalStore';
import { useUserStore } from '@/stores/userStore';

import { CheckCircle } from 'lucide-react';

// 임시 데이터
interface MemberData {
  userId: string;
  email: string;
  name: string;
  roles: string[];
  anonyVisibility: boolean;
}

interface ProjectLinkForm {
  selectedEmail: string;
  authCode: string;
}

interface ProjectLinkModalProps {
  projectId: number;
}

export default function ProjectLinkModal({ projectId }: ProjectLinkModalProps) {
  const { register, handleSubmit, watch, setValue } = useForm<ProjectLinkForm>({
    defaultValues: {
      selectedEmail: '',
      authCode: '',
    },
  });

  const selectedEmail = watch('selectedEmail'); // 비회원 목록 중 선택한 팀원의 이메일
  const authCode = watch('authCode');

  const { openModal, closeModal } = useModalStore();
  const loginUser = useUserStore((state) => state.user);
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호가 전송된 상태인지

  const handleTimerEnd = () => {
    // 타이머 종료 시 인증번호를 다시 받을 수 있도록 버튼 활성화 처리
    setIsCodeSent(false);
    // 인증번호 입력 칸 초기화
    setValue('authCode', '');
    // 알림 띄우기
    alert('인증시간이 만료되었습니다. 인증번호를 다시 요청해주세요.');
  };
  const { timeLeft, startTimer } = useTimer(300, handleTimerEnd);

  const handleSendCodeSuccess = () => {
    // 인증번호 발송에 성공하면, 타이머 시작하며 전송 상태 true로 변경
    startTimer();
    setIsCodeSent(true);
  };

  const handleVerifyCodeSuccess = () => {
    // 인증번호 검증에 성공하면, 해당 정보로 프로젝트 링크 api 호출하기
    linkProjectMutation.mutate({ projectId, anonymousEmail: selectedEmail });
  };

  const handleLinkProjectSuccess = () => {
    // 연동에 성공하면, 모달을 닫으며 연동 완료 메시지창 띄우기
    alert('연동 성공');
    closeModal();
    setTimeout(() => {
      openModal(<LinkCompleteMessage />);
    });
  };

  const sendCodeMutation = useSendEmailCode(handleSendCodeSuccess);
  const verifyCodeMutation = useVerifyAuthCode(handleVerifyCodeSuccess);
  const linkProjectMutation = useLinkProject(handleLinkProjectSuccess);

  // 인증번호 받기 버튼 비활성화 기준 : 선택된 이메일이 없거나, 인증번호를 받은 상태일 때
  const isDisabledSendButton = !selectedEmail || isCodeSent;

  // 인증하기 버튼 비활성화 기준 : 인증번호가 전송되지 않았거나, 입력창에 값이 없거나, 시간이 끝났을 때
  const isDisabledVerifyButton = !isCodeSent || !authCode || !timeLeft;

  // 인증번호 받기, 인증하기 form 제출
  const onSubmit = (data: ProjectLinkForm) => {
    if (!isCodeSent) {
      // 인증번호가 전송이 된 상태가 아니라면, 인증번호 전송 api 호출
      sendCodeMutation.mutate({ email: data.selectedEmail, authType: 'LOAD_PROJECT' });
    } else {
      // 인증번호 전송이 진행된 상태라면, 인증하기 api 호출
      verifyCodeMutation.mutate({
        email: data.selectedEmail,
        authCode: data.authCode,
        authType: 'LOAD_PROJECT',
      });
    }
  };

  const handleSelectMember = (email: string) => {
    // 인증번호를 받은 상태라면 상태 변경 비활성화
    if (!isCodeSent) {
      setValue('selectedEmail', email);
    }
  };

  // 해당 프로젝트의 멤버 정보 가져오기
  const {
    data,
    isLoading: memberDataLoading,
    isError: memberDataError,
  } = useGetProfileProjectDetails(false, projectId);

  const memberData: MemberData[] = data?.data.members || [];
  const { sortedMemberData, separatorIndex } = processingMemberData(memberData);
  const isValidData = !(memberDataLoading || memberDataError || !data);

  // 내가 이미 포함되어 있는 프로젝트라면 return 처리
  const alertShownRef = useRef(false);

  const isAlreadyMember = sortedMemberData.some((member) => member.userId === loginUser?.userId);
  if (isAlreadyMember && loginUser?.userId && !alertShownRef.current) {
    alertShownRef.current = true;
    closeModal();
    setTimeout(() => {
      alert('이미 연동된 프로젝트입니다.');
    });
    return null;
  }

  const renderMemberList = () => (
    <ul className={cn('flex min-h-[300px] w-full flex-col gap-4', !isValidData && 'flex-center')}>
      {memberDataLoading ? (
        <ComponentSpinner />
      ) : memberDataError ? (
        <span className="text-gray-600 display6">
          연동할 프로젝트의 팀원을 로드하는 중 오류가 발생했습니다.
        </span>
      ) : sortedMemberData.length === 0 ? (
        <span className="text-gray-600 display6">연동할 프로젝트의 팀원이 없습니다.</span>
      ) : (
        sortedMemberData.map((member, index) => (
          <li key={index}>
            <MemberItem
              member={member}
              index={index}
              isSelected={selectedEmail === member.email}
              onSelect={() => handleSelectMember(member.email)}
            />
            {index === separatorIndex && <Separator className="my-4" />}
          </li>
        ))
      )}
    </ul>
  );

  return (
    <ModalLayout
      contentClassName="pt-6 max-w-[550px]"
      title={<p className="my-5 body2">다음 중 일치하는 사용자 정보를 선택해 주세요.</p>}>
      <form onSubmit={handleSubmit(onSubmit)} className="gap-4 flex-col-center">
        <BorderCard className="w-full">
          <section className="flex max-h-[365px] w-full flex-col overflow-auto scroll-smooth px-3 scrollbar-thin">
            {renderMemberList()}
          </section>
        </BorderCard>
        <section className="w-full flex-col-center">
          <Button
            type="submit"
            disabled={isDisabledSendButton}
            pending={sendCodeMutation.isPending}>
            인증번호 받기
          </Button>
        </section>
        <section className="w-full flex-col-center">
          <div className="flex items-center gap-2">
            <div className="relative w-full flex-grow sm:w-auto">
              <Input
                {...register('authCode')}
                className="w-[300px]"
                placeholder="인증번호를 입력해 주세요."
                disabled={!isCodeSent}
              />
              {isCodeSent && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-danger-500">
                  {formatSecondToMMSS(timeLeft)}
                </span>
              )}
            </div>
            <Button
              type="submit"
              disabled={isDisabledVerifyButton}
              pending={verifyCodeMutation.isPending}>
              인증하기
            </Button>
          </div>
        </section>
      </form>
    </ModalLayout>
  );
}

interface MemberItemProps {
  member: MemberData;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}
const MemberItem = ({ member, index, isSelected, onSelect }: MemberItemProps) => {
  // - 비회원 : 이름은 보여지고, 이메일은 앞글자 2개 보여지고 @ 뒤는 다 보여짐
  // - 회원이지만 비공개 처리 : 이름 한글자만 공개, 이메일은 앞글자 2개 보여지고 @ 뒤는 다 보여짐
  // - 회원이고 공개처리 : 그냥 다 보여짐
  const isNonMember = member.userId === '-1';
  const isPublicUser = member.userId !== '-1' && member.anonyVisibility;
  const isPrivateUser = member.userId !== '-1' && !member.anonyVisibility;

  return (
    <>
      <div className="flex w-full items-center gap-[6px]">
        <span className="h-[40px] w-[40px] rounded-full bg-gray-100 flex-center">
          <CirclePlanetIcon iconIndex={index} />
        </span>
        <Input
          readOnly
          value={!isPrivateUser ? member.name : maskName(member.name)}
          className="w-[85px]"
          placeholder="이름"
          disabled={!isNonMember}
        />
        <Input
          readOnly
          value={isPublicUser ? member.email : maskEmail(member.email)}
          className="flex-1"
          placeholder="prism@gmail.com"
          disabled={!isNonMember}
        />
        {!isNonMember ? (
          <span className="h-5 w-5" />
        ) : (
          <span onClick={onSelect}>
            <DoubleCircle isSelect={isSelected} />
          </span>
        )}
      </div>
      <div className="ml-[46px] mt-[4px]">
        <ul className="flex flex-wrap gap-1">
          {member.roles.map((role, index) => (
            <li key={index}>
              <TagInput colorTheme="indigo" isDisabled value={role} />
            </li>
          ))}
        </ul>
        {!isNonMember && <span className="text-info-500 caption">이미 가입된 계정입니다.</span>}
      </div>
    </>
  );
};

// 아래 라디오 버튼은 추후 유래님이 추가한 svg로 변경 예정
interface DoubleCircleProps {
  isSelect?: boolean;
}

const DoubleCircle = ({ isSelect = false }: DoubleCircleProps) => {
  return (
    <div
      className={cn(
        'h-5 w-5 cursor-pointer rounded-full border-[2.5px] bg-white flex-center',
        isSelect ? 'border-purple-500' : 'border-gray-300',
      )}>
      <div className={cn('h-3 w-3 rounded-full', isSelect ? 'bg-purple-500' : 'bg-gray-300')} />
    </div>
  );
};

const LinkCompleteMessage = () => {
  return (
    <MessageBox
      title="이메일 인증이 완료되었습니다!"
      subTitle="내 프로젝트에 추가되었어요"
      titleIcon={<CheckCircle className="stroke-purple-500" />}
      footer={<MessageBox.MessageConfirmButton text="확인" />}
    />
  );
};

// 팀원 데이터 정렬 및 비회원/회원 구분선 index 구하기
const processingMemberData = (memberData: MemberData[]) => {
  // 회원가입이 안된 팀원 먼저 보여주기 - userId, 이름순 정렬
  const sortedMemberData = memberData.sort((a, b) => {
    if (a.userId !== b.userId) {
      return a.userId !== '-1' ? 1 : -1;
    }
    return a.name.localeCompare(b.name);
  });

  // Separator를 넣어줄 비회원->회원 경계 index값 찾기
  let separatorIndex = -1;
  for (let i = 0; i < sortedMemberData.length - 1; i++) {
    if (sortedMemberData[i].userId != sortedMemberData[i + 1].userId) {
      separatorIndex = i;
      break;
    }
  }
  return { sortedMemberData, separatorIndex };
};
