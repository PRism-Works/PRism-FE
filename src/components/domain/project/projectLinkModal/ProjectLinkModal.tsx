import { PlanetIcons } from '@/assets/icon/planet';
import BorderCard from '@/components/common/card/BorderCard';
import TagInput from '@/components/common/input/TagInput';
import MessageBox from '@/components/common/messgeBox/MessageBox';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { formatSecondToMMSS } from '@/lib/dateTime';
import { maskEmail, maskName } from '@/lib/masking';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/stores/modalStore';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';

// 임시 데이터
interface MemberData {
  name: string;
  email: string;
  roles: string[];
  isRegistered: boolean;
}
const memberData = [
  {
    name: 'name1',
    email: 'email1@nate.com',
    roles: ['기획자', '백엔드', '프론트'],
    isRegistered: true,
  },
  {
    name: 'name2',
    email: 'email2@nate.com',
    roles: ['기획자', '백엔드'],
    isRegistered: true,
  },
  {
    name: 'name1',
    email: 'email3@nate.com',
    roles: ['기획자', '백엔드', '프론트'],
    isRegistered: true,
  },
  {
    name: 'name2',
    email: 'email24@nate.com',
    roles: ['기획자', '백엔드'],
    isRegistered: false,
  },
  {
    name: 'name1',
    email: 'email5@nate.com',
    roles: ['기획자', '백엔드', '프론트'],
    isRegistered: false,
  },
];

export default function ProjectLinkModal() {
  const { openModal, closeModal } = useModalStore();
  const [selectUserEmail, setSelectUserEmail] = useState<string>('');

  // 회원가입이 안된 팀원 먼저 보여주기. (이름순 정렬)
  const sortedMemberData = memberData.sort((a, b) => {
    if (a.isRegistered !== b.isRegistered) {
      return a.isRegistered ? 1 : -1;
    }
    return a.name.localeCompare(b.name);
  });

  // Separator를 넣어줄 index값 찾기
  let separatorIndex = -1;
  for (let i = 0; i < sortedMemberData.length - 1; i++) {
    if (sortedMemberData[i].isRegistered != sortedMemberData[i + 1].isRegistered) {
      separatorIndex = i;
      break;
    }
  }

  // #20240722.syjang, 인증번호 받는 로직은 사용자 정보 api 연동하며 작업 예정
  // 남은 유효시간
  const timeLeft = 300;

  const handleSelectMember = (email: string) => {
    setSelectUserEmail(email);
  };
  const sendVerifyCode = () => {
    if (!selectUserEmail) {
      alert(`사용자를 선택해주세요.`);
      return;
    }
    alert(`${selectUserEmail}로 이메일 인증 전송 api 호출하기`);
  };
  const handleVerify = () => {
    closeModal();
    setTimeout(() => {
      openModal(<LinkCompleteMessage />);
    });
  };

  const renderMemberList = () => (
    <ul className="flex w-full flex-col gap-2">
      {sortedMemberData.map((member, index) => (
        <li key={index}>
          <MemberItem
            member={member}
            index={index}
            isSelected={selectUserEmail === member.email}
            onSelect={() => handleSelectMember(member.email)}
          />
          {index === separatorIndex && <Separator className="my-4" />}
        </li>
      ))}
    </ul>
  );

  return (
    <ModalLayout
      contentClassName="pt-6 max-w-[550px]"
      title={<p className="my-5 body2">다음 중 일치하는 사용자 정보를 선택해 주세요.</p>}>
      <div className="gap-4 flex-col-center">
        <BorderCard className="w-full">
          <section className="flex max-h-[365px] w-full flex-col overflow-auto scroll-smooth px-3 scrollbar-thin">
            {renderMemberList()}
          </section>
        </BorderCard>
        <section className="w-full flex-col-center">
          <Button onClick={sendVerifyCode}>인증번호 받기</Button>
        </section>
        <section className="w-full flex-col-center">
          <div className="flex items-center gap-2">
            <div className="relative w-full flex-grow sm:w-auto">
              <Input className="w-[300px]" placeholder="인증번호를 입력해 주세요." />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-danger-500">
                {formatSecondToMMSS(timeLeft)}
              </span>
            </div>
            <Button onClick={handleVerify}>인증하기</Button>
          </div>
        </section>
      </div>
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
  const planetKeys = Object.keys(PlanetIcons) as Array<keyof typeof PlanetIcons>;
  const PlanetIcon = PlanetIcons[planetKeys[index % planetKeys.length]];

  return (
    <>
      <div className="flex w-full items-center gap-[6px]">
        <span className="h-[40px] w-[40px] rounded-full bg-gray-100 flex-center">
          <PlanetIcon />
        </span>
        <Input
          readOnly
          value={maskName(member.name)}
          className="w-[85px]"
          placeholder="이름"
          disabled={member.isRegistered}
        />
        <Input
          readOnly
          value={maskEmail(member.email)}
          className="flex-1"
          placeholder="prism@gmail.com"
          disabled={member.isRegistered}
        />
        {member.isRegistered ? (
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
        {member.isRegistered && (
          <span className="text-info-500 caption">이미 가입된 계정입니다.</span>
        )}
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
