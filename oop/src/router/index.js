import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import pageStateService from '../services/page-state-service';

Vue.use(VueRouter);
pageStateService.importPageRoutes(routes);

const routeCollection = [
  {
    path: routes.HOME_PAGE.path,
    name: routes.HOME_PAGE.name,
    component: routes.HOME_PAGE.component
  },
  {
    path: routes.ACCOUNT_TYPE_PAGE.path,
    name: routes.ACCOUNT_TYPE_PAGE.name,
    component: routes.ACCOUNT_TYPE_PAGE.component
  },
  {
    path: routes.MOVE_INFO_PAGE.path,
    name: routes.MOVE_INFO_PAGE.name,
    component: routes.MOVE_INFO_PAGE.component
  },
  {
    path: routes.REVIEW_PAGE.path,
    name: routes.REVIEW_PAGE.name,
    component: routes.REVIEW_PAGE.component
  },
  {
    path: routes.YOUR_INFO_PAGE.path,
    name: routes.YOUR_INFO_PAGE.name,
    component: routes.YOUR_INFO_PAGE.component
  },
  {
    path: routes.SUBMISSION_PAGE.path,
    name: routes.SUBMISSION_PAGE.name,
    component: routes.SUBMISSION_PAGE.component
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
