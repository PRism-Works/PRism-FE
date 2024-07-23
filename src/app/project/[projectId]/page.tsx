'use client';
// 검색 결과에서 넘어온 프로젝트 상세 조회 페이지
// 이것도 페이지 전체가 서버에서 받아온 데이터가 필요해서.. nextjs의 fetch를 사용하는게 아니라면 .. ssr이 의미가 없을 것 같습니다..
// use client 선언해서 사용하는게 좋을 것 같아요

import BorderCard from '@/components/common/card/BorderCard';
import TagInput from '@/components/common/input/TagInput';
import UserSummaryCard from '@/components/domain/user/UserSummaryCard';
import { USER_CARD_VARIANT } from '@/models/user/userModels';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface SearchProjectDetailPageProps {
  params: { projectId: string };
}

export default function SearchProjectDetailPage({ params }: SearchProjectDetailPageProps) {
  const projectId = params.projectId;
  console.log(projectId);
  const testUserData = {
    userId: '23fasdf',
    name: '김프리즘',
    email: 'rkfhadlwhgdk@naver.com',
    roles: ['기획자', '디자이너'],
  };
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-12">
      <div className="flex w-full max-w-[1040px] flex-col gap-10">
        <section className="flex flex-col gap-4">
          <h2 className="text-gray-900 body6">프로젝트 정보</h2>
          <BorderCard className="flex flex-col justify-center gap-7 p-7">
            <h3 className="flex flex-col gap-1">
              <div className="text-gray-500 caption">
                <span className="text-purple-500 mobile2">적극성</span>이 높은 팀원이 많은 팀의
                프로젝트에요!
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-700 body7">스위그 5기 6팀 팀프로젝트 PRism</span>
                <span className="gap-1 text-gray-500 caption flex-center">
                  <CheckCircle2 className="h-4 w-4 fill-success-50 stroke-success-500" />
                  인증완료!
                </span>
              </div>
            </h3>
            <div className="grid grid-cols-[90px_1fr] gap-x-8 gap-y-7">
              <div className="text-purple-800 display6">링크 바로가기</div>
              <div className="flex items-center">
                <a href="PRism.co.kr" className="text-gray-500 underline underline-offset-4">
                  PRism.co.kr
                </a>
                <ArrowUpRight className="h-6 w-6 stroke-gray-500" />
              </div>
              <div className="text-gray-600 display6">기관명</div>
              <div className="text-black display4">스위그</div>
              <div className="text-gray-600 display6">기간</div>
              <div className="text-black display4">2024.05.11 - 2024.07.22</div>
            </div>
          </BorderCard>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-gray-900 body6">프로젝트 산출물 정보</h2>
          <BorderCard className="p-7">
            <div className="grid grid-cols-[90px_1fr] gap-x-8 gap-y-7">
              <div className="text-gray-600 display6">상세설명</div>
              <div className="text-black display4">
                이 프로젝트는 웰훕스팅 커뮤니티 이 프로젝트는 웰훕스팅 커뮤니티 스위코에서 주최한
                6주 단기 웹 서비스 출시를 목표로 진행된 프로젝트입니다. PRism은 it프로젝트를
                마무리한 사람들에게 동료평가 서비스를 제공하는 웹사이트입니다. 주요 기능은
                프로젝트를 등록하고 평가지를 보내 팀원들의 평가를 받아 5가지의 지표로 나타내는
                것입니다.스위코에서 주최한 6주 단기 웹 서비스 출시를 목표로 진행된 프로젝트입니다.
                PRism은 it프로젝트를 마무리한 사람들에게 동료평가 서비스를 제공하는 웹사이트입니다.
                주요 기능은 프로젝트를 등록하고 평가지를 보내 팀원들의 평가를 받아 5가지의 지표로
                나타내는 것입니다.
              </div>

              <div className="text-gray-600 display6">카테고리</div>
              <div className="flex gap-2">
                <TagInput value="금융" isDisabled />
                <TagInput value="생산성" isDisabled />
                <TagInput value="기타" isDisabled />
              </div>

              <div className="text-gray-600 display6">기술스택</div>
              <div className="flex gap-2">
                <TagInput value="Spring Framework" isDisabled colorTheme="gray" />
                <TagInput value="Python" isDisabled colorTheme="gray" />
                <TagInput value="HTML/CSS" isDisabled colorTheme="gray" />
              </div>
            </div>
          </BorderCard>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-gray-900 body6">팀원 정보</h2>
          <div className="flex flex-wrap gap-4">
            <UserSummaryCard userData={testUserData} />
            <UserSummaryCard userData={testUserData} variant={USER_CARD_VARIANT.NON_MEMBER} />
            <UserSummaryCard userData={testUserData} variant={USER_CARD_VARIANT.MEMBER_PRIVATE} />
            <UserSummaryCard userData={testUserData} variant={USER_CARD_VARIANT.MEMBER_PUBLIC} />
          </div>
        </section>
      </div>
    </div>
  );
}
