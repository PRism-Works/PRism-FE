'use client';

import { useReducer } from 'react';
import { useTheme } from 'next-themes';
import { useModalStore } from '@/stores/modalStore';
import { AlarmClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PrismLogo from '@/assets/logo/logo.svg';
import PrismLogoDark from '@/assets/logo/logo-darkmode.svg';
import PRismPrivacyPolicyModal from '../auth/privacyPolicy/PRismPrivacyPolicyModal';
import PRismTermsOfServiceModal from '../auth/privacyPolicy/PRismTermsOfServiceModal';
import AgreementCheckbox from '../auth/privacyPolicy/AgreementCheckbox';

interface SurveyIntroductionProps {
  setShowIntroduction: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SurveyIntroduction({ setShowIntroduction }: SurveyIntroductionProps) {
  const [isAgreed, setIsAgreed] = useReducer((state: boolean) => !state, false);
  const { openModal } = useModalStore();
  const { theme } = useTheme();
  const Logo = theme === 'dark' ? PrismLogoDark : PrismLogo;

  return (
    <div className="text-gray-700 container min-h-screen w-full max-w-[1040px] px-4 py-8 flex-col-center md:px-8">
      <div className="mb-8 flex-center">
        <Logo />
      </div>
      <p className="mb-2 text-center body2">
        <span className="text-purple-700">PRism 평가 서비스</span>에 오신 것을 환영합니다.
      </p>
      <p className="text-gray-500 mb-2 text-center text-base mobile1">
        공들인 프로젝트의 마지막 여정을 PRism과 함께해주셔서 감사합니다.
      </p>
      <div className="mb-12 flex-col-center">
        <div className="mb-2 mt-4 flex-center">
          <AlarmClock className="text-gray-600 mr-2 h-5 w-5" />
          <p className="text-gray-600 display6">총 소요시간</p>
        </div>
        <p className="text-danger-500 display6">5-10분</p>
      </div>

      <div className="w-full md:w-[80%] lg:w-[70%] xl:w-[65%]">
        <div className="mb-8 w-full">
          <h2 className="text-black mb-4 display6">✨ PRism 서비스 소개 ✨</h2>
          <div className="mb-8">
            <div className="text-gray-600 mb-2 flex display6">
              <span className="text-gray-700 mr-3">Q. </span>
              PRism은 어떤 서비스인가요?
            </div>
            <div className="text-purple-700 mb-2 flex mobile1">
              <span className="text-gray-700 mr-3">A. </span>팀 프로젝트는 개인의 커뮤니케이션
              능력을 신뢰도 있게 파악할 수 있는 좋은 기회입니다.
            </div>
            <div className="text-gray-600 ml-8 whitespace-pre-wrap display5">
              <p className="break-words">
                PRism은 팀 프로젝트 완료 후, 팀 구성원 사이의 협력 능력을 평가하도록 돕는
                서비스입니다.
              </p>
              <p className="break-words">
                구성원은 각자의 강점을 파악하고 개선점을 발견해 개인의 성장이 이바지할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-8">
              <div className="text-gray-600 mb-2 flex display6">
                <span className="text-gray-700 mr-3">Q. </span>
                PRism 평가 서비스를 이용하면 어떤 혜택이 있나요?
              </div>
              <div className="text-purple-700 mb-2 flex mobile1">
                <span className="text-gray-700 mr-3">A. </span>
                나뿐만 아니라 다양한 사람들의 팀 프로젝트와 협력 능력을 조절할 수 있습니다.
              </div>
              <div className="text-gray-600 ml-8 whitespace-pre-wrap display5">
                <p className="break-words">
                  다른 팀원들이 평가한 나의 협력 능력 평가 데이터를 분석해보고 시각적인 분석
                  리포트를 받아볼 수 있으며,
                </p>
                <p className="break-words">
                  평가 결과를 바탕으로 한 직무의 팀 구성원 지원하기, 프로젝트 성공률을 높이는 데
                  도움을 드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8 w-full text-center">
          <h2 className="text-black mb-4 text-left display6">
            📍 평가를 진행하기 전 아래 내용을 확인해 주세요
          </h2>
          <div className="mb-8 text-left">
            <p className="text-black mb-2">개인정보 처리 방침 요약</p>
            <div className="display5">
              <ul className="text-gray-600 ml-4 list-inside list-disc">
                <li className="mb-1">본 서비스는 평가 과정에서 익명성을 보장합니다.</li>
                <li className="mb-1">
                  서비스 이용 과정 중 IP 주소와 같은 일부 데이터가 수집될 수 있습니다.
                </li>
                <li>수집된 데이터는 안전하게 저장되며, 제삼자와 공유되지 않습니다.</li>
              </ul>
            </div>
          </div>
          <div className="mb-8 text-left">
            <p className="text-black mb-2">이용약관 요약</p>
            <div className="display5">
              <ul className="text-gray-600 ml-4 list-inside list-disc">
                <li className="mb-1">
                  평가는 익명으로 진행되며, 제출된 평가 데이터는 서비스 개선 및 분석 목적으로
                  사용됩니다.
                </li>
                <li className="mb-1">
                  제출된 데이터는 사용자 동의 없이 다른 목적으로 사용되지 않습니다.
                </li>
              </ul>
            </div>
            <AgreementCheckbox
              isAgreed={isAgreed}
              onToggle={setIsAgreed}
              isSmallScreen={false}
              text="필수동의 항목 및"
              privacyPolicyText="개인정보 처리 방침"
              onPrivacyPolicyClick={() => openModal(<PRismPrivacyPolicyModal />)}
              termsOfServiceText="이용약관"
              onTermsOfServiceClick={() => openModal(<PRismTermsOfServiceModal />)}
              className="mt-8 mobile1"
            />
          </div>
        </div>
      </div>
      <p className="text-purple-700 my-2 display6">
        평가를 완료하고, 나의 협업 능력 분석 리포트를 받아보세요!
      </p>
      <Button
        variant="gradient"
        className="mt-8 h-[50px] w-[150px] cursor-pointer body8"
        onClick={() => setShowIntroduction(false)}
        disabled={!isAgreed || !isAgreed}>
        평가 시작하기
      </Button>
    </div>
  );
}
