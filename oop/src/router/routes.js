
import AccountTypePage from '../views/AccountTypePage.vue';
import HomePage from '../views/HomePage.vue';
import MoveInfoPage from '../views/MoveInfoPage.vue';
import ReviewPage from '../views/ReviewPage.vue';
import YourInfoPage from '../views/YourInfoPage.vue';
import SubmissionPage from '../views/SubmissionPage.vue';
import SubmissionErrorPage from '../views/SubmissionErrorPage.vue';

export const routes = {
  ACCOUNT_TYPE_PAGE: {
    path: '/account-type',
    title: 'Account Type',
    name: 'AccountTypePage',
    component: AccountTypePage
  },
  HOME_PAGE: {
    path: '/',
    title: 'Home',
    name: 'HomePage',
    component: HomePage
  },
  MOVE_INFO_PAGE: {
    path: '/move-info',
    title: 'Move Information',
    name: 'MoveInfoPage',
    component: MoveInfoPage
  },
  REVIEW_PAGE: {
    path: '/review',
    title: 'Review',
    name: 'ReviewPage',
    component: ReviewPage
  },
  YOUR_INFO_PAGE: {
    path: '/your-info',
    title: 'Your Information',
    name: 'YourInfoPage',
    component: YourInfoPage
  },
  SUBMISSION_PAGE: {
    path: '/submission',
    title: 'Submission',
    name: 'SubmissionPage',
    component: SubmissionPage
  },
  SUBMISSION_ERROR_PAGE: {
    path: '/submission-error',
    title: 'Submission Error',
    name: 'SubmissionErrorPage',
    component: SubmissionErrorPage
  },
};

export default routes;
