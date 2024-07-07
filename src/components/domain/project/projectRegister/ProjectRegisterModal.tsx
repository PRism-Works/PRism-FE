'use client';

import { useState } from 'react';
import ModalLayout from '@/components/modal/ModalLayout';
//import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Form } from '@/components/ui/form';
import { useForm, FormProvider } from 'react-hook-form';
import { MAX_STEPS, ProjectForm, ProjectFormSchema } from './models';

import { zodResolver } from '@hookform/resolvers/zod';
import Step1 from './Step1';
import Header from './layout/Header';
import Footer from './layout/Footer';
// import Step2 from './Step2';
// import Step3 from './Step3';

export default function ProjectRegisterModal() {
  //const isSmallScreen = useMediaQuery('(max-width: 430px)');

  // 기능 붙일 때 추가 예정
  const formMethods = useForm<ProjectForm>({
    mode: 'onChange',
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      project_name: '',
      organization_name: '',
      start_date: new Date(),
      end_date: new Date(),
    },
  });
  const [currStep, setCurrStep] = useState<number>(0);

  const handleNextStep = async () => {
    // 현재 폼의 모든 입력 값에 대해 유효성 검사 수행
    const result = await formMethods.trigger();

    if (result && currStep < MAX_STEPS) {
      // #20240707.syjang, 다음 스탭 유효성 조건 추가 필요
      setCurrStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currStep > 0) {
      setCurrStep((prev) => prev - 1);
    }
  };

  const handleExternalSubmit = () => {
    formMethods.handleSubmit((data: ProjectForm) => {
      alert(JSON.stringify(data));
    })();
  };

  return (
    <ModalLayout
      title={<Header currStep={currStep} />}
      footer={
        <Footer
          currStep={currStep}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleExternalSubmit={handleExternalSubmit}
          isValid={formMethods.formState.isValid}
        />
      }>
      <div className="mb-[6px] h-[430px] w-full overflow-auto rounded-[10px] bg-gray-50 p-[18px]">
        <Form {...formMethods}>
          <FormProvider {...formMethods}>
            <form className="flex-col">
              {currStep === 0 && <Step1 />}
              {/* {currStep === 1 && <Step2 />}
            {currStep === 2 && <Step3 />} */}
            </form>
          </FormProvider>
        </Form>
      </div>
    </ModalLayout>
  );
}
