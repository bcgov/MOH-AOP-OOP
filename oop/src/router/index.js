import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import pageStateService from '../services/page-state-service';
import AccountTypePage from '../views/AccountTypePage.vue';
import HomePage from '../views/HomePage.vue';
import MoveInfoPage from '../views/MoveInfoPage.vue';
import ReviewPage from '../views/ReviewPage.vue';
import YourInfoPage from '../views/YourInfoPage.vue';
import SubmissionPage from '../views/SubmissionPage.vue';
import SubmissionErrorPage from '../views/SubmissionErrorPage.vue';
import MaintenancePage from '../views/MaintenancePage.vue';

Vue.use(VueRouter);
pageStateService.importPageRoutes(routes);

const routeCollection = [
  {
    path: routes.HOME_PAGE.path,
    name: routes.HOME_PAGE.name,
    component: HomePage
  },
  {
    path: routes.ACCOUNT_TYPE_PAGE.path,
    name: routes.ACCOUNT_TYPE_PAGE.name,
    component: AccountTypePage
  },
  {
    path: routes.MOVE_INFO_PAGE.path,
    name: routes.MOVE_INFO_PAGE.name,
    component: MoveInfoPage
  },
  {
    path: routes.REVIEW_PAGE.path,
    name: routes.REVIEW_PAGE.name,
    component: ReviewPage
  },
  {
    path: routes.YOUR_INFO_PAGE.path,
    name: routes.YOUR_INFO_PAGE.name,
    component: YourInfoPage
  },
  {
    path: routes.SUBMISSION_PAGE.path,
    name: routes.SUBMISSION_PAGE.name,
    component: SubmissionPage
  },
  {
    path: routes.SUBMISSION_ERROR_PAGE.path,
    name: routes.SUBMISSION_ERROR_PAGE.name,
    component: SubmissionErrorPage
  },
  {
    path: routes.MAINTENANCE_PAGE.path,
    name: routes.MAINTENANCE_PAGE.name,
    component: MaintenancePage
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routeCollection
});

router.beforeEach((to, from, next) => {
  // Home redirect.
  if (to.path !== routes.HOME_PAGE.path
    && !pageStateService.isPageVisited(to.path)) {
    next({ name: routes.HOME_PAGE.name });
  }
  
  // Catch-all (navigation).
  else {
    next();
  }
});

export default router;
