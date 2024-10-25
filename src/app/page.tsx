import { LandingIcons } from '@/assets/landing';
import ChartIndicators from '@/components/domain/landing/ChartIndicators';
import ProjectSurveySection from '@/components/domain/landing/section/ProjectSurveySection';
import ProjectChartSection from '@/components/domain/landing/section/ProjectChartSection';
import ProjecProfileSection from '@/components/domain/landing/section/ProjecProfileSection';
import ProjectRegisterSection from '@/components/domain/landing/section/ProjectRegisterSection';
import ProjectSearchSection from '@/components/domain/landing/section/ProjectSearchSection';
import LandingFooter from '@/components/domain/landing/section/LandingFooter';
import LandingTabs from '@/components/domain/landing/LandingTabs';

export default function LandingPage() {
  const { Title, Oval, Chart } = LandingIcons;

  return (
    <div
      className="absolute flex min-h-screen w-full flex-col items-center justify-start p-10"
      style={{
        background:
          'linear-gradient(173.26deg, #2F145A 1.76%, #60239C 25.67%, #37188E 49.11%, #60239C 73.51%, #21197C 97.43%)',
      }}>
      <LandingTabs />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <Oval className="absolute left-1/2 top-[-20px] h-auto w-full -translate-x-1/2 transform md:top-[-2.5%]" />
      </div>
      <div className="relative z-10 flex-col-center md:mt-20 md:space-y-16">
        <Title
          className="mt-[3%] w-full max-w-[945px] sm:max-w-[520px] md:max-w-[620px] lg:max-w-[800px] xl:max-w-[945px]"
          style={{ width: 'clamp(200px, 50vw, 945px)' }}
        />
        <Chart className="my-3 mt-8" style={{ width: 'clamp(50px, 15vw, 110px)' }} />
        <ChartIndicators />
        <div id="survey">
          <ProjectSurveySection />
        </div>
        <div id="chart">
          <ProjectChartSection />
        </div>
        <div id="profile">
          <ProjecProfileSection />
        </div>
        <div id="register">
          <ProjectRegisterSection />
        </div>
        <div id="search">
          <ProjectSearchSection />
        </div>
        <LandingFooter />
      </div>
    </div>
  );
}
