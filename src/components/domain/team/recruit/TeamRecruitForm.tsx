'use client';

import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import {
  RecruitmentPeriodSection,
  ContactMethodSection,
  ApplicationMethodSection,
  ProgressMethodSection,
  PositionSection,
  TitleSection,
  DetailsSection,
} from '@/components/domain/team/recruit/section';
import useTeamRecruitForm from './section/hooks/useTeamRecruitForm';
import BorderCard from '@/components/common/card/BorderCard';
import { SectionHeader } from '@/components/domain/team/recruit/section/ui/SectionHeader';

export function TeamRecruitForm() {
  const { form, onSubmit } = useTeamRecruitForm();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-14">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <section className="space-y-6">
            <SectionHeader number={1} text="팀빌딩을 위한 기본 정보를 입력해 주세요." />
            <BorderCard className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 md:px-8 lg:px-12">
              <div className="mx-auto w-full space-y-10 sm:w-[85%] md:w-[70%] lg:w-[60%]">
                <RecruitmentPeriodSection />
                <ContactMethodSection />
                <ApplicationMethodSection />
                <ProgressMethodSection />
                <PositionSection />
              </div>
            </BorderCard>
          </section>

          <section className="space-y-6">
            <SectionHeader number={2} text="팀빌딩을 위한 상세 정보를 입력해 주세요." />
            <div className="space-y-10">
              <TitleSection />
              <DetailsSection />
            </div>
          </section>

          <section className="gap-3 flex-center">
            <Button variant="outline" type="button" className="w-16 display4">
              취소
            </Button>
            <Button variant="default" type="submit" className="w-16 display4">
              저장
            </Button>
          </section>
        </form>
      </FormProvider>
    </div>
  );
}
