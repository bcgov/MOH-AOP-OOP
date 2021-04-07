export const routes = {
  ACCOUNT_TYPE_PAGE: {
    path: '/account-type',
    title: 'Account Type',
    name: 'AccountTypePage',
  },
  HOME_PAGE: {
    path: '/',
    title: 'Home',
    name: 'HomePage',
  },
  MOVE_INFO_PAGE: {
    path: '/move-info',
    title: 'Move Information',
    name: 'MoveInfoPage',
  },
  REVIEW_PAGE: {
    path: '/review',
    title: 'Review',
    name: 'ReviewPage',
  },
  YOUR_INFO_PAGE: {
    path: '/your-info',
    title: 'Your Information',
    name: 'YourInfoPage',
  },
  SUBMISSION_PAGE: {
    path: '/submission',
    title: 'Submission',
    name: 'SubmissionPage',
  },
  SUBMISSION_ERROR_PAGE: {
    path: '/submission-error',
    title: 'Submission Error',
    name: 'SubmissionErrorPage',
  },
};

export const routeStepOrder = [
  routes.HOME_PAGE,
  routes.YOUR_INFO_PAGE,
  routes.ACCOUNT_TYPE_PAGE,
  routes.MOVE_INFO_PAGE,
  routes.REVIEW_PAGE,
  routes.SUBMISSION_PAGE
]

export const isPastPath = (toPath, fromPath) => {
  for (let i=0; i<routeStepOrder.length; i++) {
    if (routeStepOrder[i].path === fromPath) {
      return false;
    } else if (routeStepOrder[i].path === toPath) {
      return true;
    }
  }
  return false;
}

export default routes;
