import VueRouter from 'vue-router';
import AssignmentOfPayment from './modules/aop/components/AssignmentOfPayment.vue';
import routes from './routes';
import pageStateService from './modules/common/services/page-state-service';
import store from './store';
import { RESET_FORM } from './store';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '/',
      component: AssignmentOfPayment,
      redirect: routes.HOME.path,
      children: [
        {
          path: routes.HOME.path,
          name: routes.HOME.name,
          component: routes.HOME.component
        },
        {
          path: routes.SUBMISSION_INFO.path,
          name: routes.SUBMISSION_INFO.name,
          component: routes.SUBMISSION_INFO.component
        },
        {
          path: routes.REVIEW.path,
          name: routes.REVIEW.name,
          component: routes.REVIEW.component
        },
        {
          path: routes.SUBMISSION.path,
          name: routes.SUBMISSION.name,
          component: routes.SUBMISSION.component
        },
      ]
    },
    {
      path: routes.SENDING.path,
      name: routes.SENDING.name,
      component: routes.SENDING.component
    },
    {
      path: routes.SUBMISSION_ERROR.path,
      name: routes.SUBMISSION_ERROR.name,
      component: routes.SUBMISSION_ERROR.component
    }
  ]
});

const shouldNavigateHome = (homeRouteName, to) => {
  if(to && to.name && homeRouteName !== to.name && !pageStateService.isPageComplete(to.path)) {
    return true;
  }
  return false;
};

router.beforeEach((to, from, next) => {
  // Home redirect
  if (shouldNavigateHome(routes.HOME.name, to)) {
    next({ name: routes.HOME.name });
  }
  
  // Catch-all (navigation)
  else {
    next();
  }
});

router.afterEach((to, from) => {
  if (to.path === routes.HOME.path && !pageStateService.isPageComplete(to.path)) {
    store.dispatch(RESET_FORM);
  }
});

export default router;
