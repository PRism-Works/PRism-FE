import { FC, SVGProps } from 'react';

import Title from './landing-title.svg';
import Oval from './landing-oval.svg';
import Chart from './landing-chart.svg';
import ChartDetail from './landing-chart-detail.svg';
import PRismChart from './landing-prism-chart.svg';
import Profile from './landing-profile.svg';
import Mypage from './landing-mypage.svg';
import MypageDetail from './landing-mypage-detail.svg';
import Survey from './landing-survey.svg';
import SurveyRadio from './landing-survey-radio.svg';
import SurveyText from './landing-survey-text.svg';

export const LandingIcons: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  Title,
  Oval,
  Chart,
  ChartDetail,
  PRismChart,
  Profile,
  Mypage,
  MypageDetail,
  Survey,
  SurveyRadio,
  SurveyText,
};
