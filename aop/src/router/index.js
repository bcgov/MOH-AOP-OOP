import VueRouter from "vue-router";
import AssignmentOfPayment from "../views/AssignmentOfPayment.vue";
import { routes } from "./routes";

// Determine if back or forward nav buttons have been pressed
let navPushed = false;
window.onpopstate = function (event) {
  navPushed = true;
};

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: routes.SIGN_IN.path,
      name: routes.SIGN_IN.name,
      component: routes.SIGN_IN.component,
      meta: {
        title: "Sign In | Upload Tool",
        metaTags: [
          {
            name: "description",
            content:
              "Sign in page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
          },
          {
            property: "og:description",
            content:
              "Sign in page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
          }
        ]
      }
    },
    {
      path: "/",
      component: AssignmentOfPayment,
      redirect: routes.SIGN_IN.path,
      children: [
        {
          path: routes.SUBMISSION_INFO.path,
          name: routes.SUBMISSION_INFO.name,
          component: routes.SUBMISSION_INFO.component,
          meta: {
            title: "Select a Form | Upload Tool",
            metaTags: [
              {
                name: "description",
                content:
                  "Form selection page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
              },
              {
                property: "og:description",
                content:
                  "Form selection page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
              }
            ]
          }
        },
        {
          path: routes.REVIEW.path,
          name: routes.REVIEW.name,
          component: routes.REVIEW.component,
          meta: {
            title: "Review | Upload Tool",
            metaTags: [
              {
                name: "description",
                content:
                  "Submission info review page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
              },
              {
                property: "og:description",
                content:
                  "Submission info review page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
              }
            ]
          }
        },
        {
          path: routes.CONFIRMATION.path,
          name: routes.CONFIRMATION.name,
          component: routes.CONFIRMATION.component,
          meta: {
            title: "Confirmation | Upload Tool",
            metaTags: [
              {
                name: "description",
                content:
                  "Confirmation page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
              },
              {
                property: "og:description",
                content:
                  "Confirmation page, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
              }
            ]
          }
        },
        {
          path: routes.SUBMISSION_ERROR.path,
          name: routes.SUBMISSION_ERROR.name,
          component: routes.SUBMISSION_ERROR.component,
          meta: {
            title: "Error | Upload Tool",
            metaTags: [
              {
                name: "description",
                content:
                  "An error occured, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
              },
              {
                property: "og:description",
                content:
                  "An error occured, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
              }
            ]
          }
        }
      ],
    },
    {
      path: routes.SENDING.path,
      name: routes.SENDING.name,
      component: routes.SENDING.component,
      meta: {
        title: "Sending | Upload Tool",
        metaTags: [
          {
            name: "description",
            content:
              "Submitting application, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
          },
          {
            property: "og:description",
            content:
              "Submitting application, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
          }
        ]
      }
    },
    {
      path: routes.SESSION_END.path,
      name: routes.SESSION_END.name,
      component: routes.SESSION_END.component,
      meta: {
        title: "Session End | Upload Tool",
        metaTags: [
          {
            name: "description",
            content:
              "Session ended, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
          },
          {
            property: "og:description",
            content:
              "Session ended, Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
          }
        ]
      }
    },
    {
      path: routes.MAINTENANCE.path,
      name: routes.MAINTENANCE.name,
      component: routes.MAINTENANCE.component,
      meta: {
        title: "Maintenance | Upload Tool",
        metaTags: [
          {
            name: "description",
            content:
              "Down for maintenance - Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
          },
          {
            property: "og:description",
            content:
              "Down for maintenance - Upload Tool for Assignment of Payment and Outpatient Operator Payment Administration"
          }
        ]
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head
    .forEach(tag => document.head.appendChild(tag));

  // Disable back and forward buttons
  if (navPushed) {
    navPushed = false;
    return;
  }

  // Catch-all (navigation)
  else {
    next();
  }
});

export default router;
