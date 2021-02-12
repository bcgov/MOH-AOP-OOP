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
          component: routes.SUBMISSION_INFO.component,
          meta: {
            title: 'Upload Tool | Select a Form',
            metaTags: [
              {
                name: 'description',
                content: 'Form selection page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
              },
              {
                property: 'og:description',
                content: 'Form selection page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
              }
            ]
          }
        },
        {
          path: routes.REVIEW.path,
          name: routes.REVIEW.name,
          component: routes.REVIEW.component,
          meta: {
            title: 'Upload Tool | Review',
            metaTags: [
              {
                name: 'description',
                content: 'Submission info review page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
              },
              {
                property: 'og:description',
                content: 'Submission info review page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
              }
            ]
          }
        },
        {
          path: routes.SUBMISSION.path,
          name: routes.SUBMISSION.name,
          component: routes.SUBMISSION.component,
          meta: {
            title: 'Upload Tool | Confirmation',
            metaTags: [
              {
                name: 'description',
                content: 'Confirmation page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
              },
              {
                property: 'og:description',
                content: 'Confirmation page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
              }
            ]
          }
        },
      ],
      meta: {
        title: 'Upload Tool | Sign In',
        metaTags: [
          {
            name: 'description',
            content: 'Sign in page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
          },
          {
            property: 'og:description',
            content: 'Sign in page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
          }
        ]
      }
    },
    {
      path: routes.SENDING.path,
      name: routes.SENDING.name,
      component: routes.SENDING.component,
      meta: {
        title: 'Upload Tool | Sending',
        metaTags: [
          {
            name: 'description',
            content: 'Submitting application, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
          },
          {
            property: 'og:description',
            content: 'Submitting application, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
          }
        ]
      }
    },
    {
      path: routes.SUBMISSION_ERROR.path,
      name: routes.SUBMISSION_ERROR.name,
      component: routes.SUBMISSION_ERROR.component,
      meta: {
        title: 'Upload Tool | Error',
        metaTags: [
          {
            name: 'description',
            content: 'An error occured, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
          },
          {
            property: 'og:description',
            content: 'An error occured, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration'
          }
        ]
      }
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
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));
  
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
