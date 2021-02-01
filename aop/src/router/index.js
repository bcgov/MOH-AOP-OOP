import VueRouter from 'vue-router';
import AssignmentOfPayment from '../views/AssignmentOfPayment.vue';
import routes from './routes';
import pageStateService from '../services/page-state-service';
import store from '../store/index';
import { RESET_FORM } from '../store/index';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '/',
      component: AssignmentOfPayment,
      redirect: routes.SIGN_IN.path,
      children: [
        {
          path: routes.SIGN_IN.path,
          name: routes.SIGN_IN.name,
          component: routes.SIGN_IN.component
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
  if (shouldNavigateHome(routes.SIGN_IN.name, to)) {
    next({ name: routes.SIGN_IN.name });
  }
  
  // Catch-all (navigation)
  else {
    next();
  }
});

router.afterEach((to, from) => {
  if (to.path === routes.SIGN_IN.path && !pageStateService.isPageComplete(to.path)) {
    store.dispatch(RESET_FORM);
  }
});

export default router;
