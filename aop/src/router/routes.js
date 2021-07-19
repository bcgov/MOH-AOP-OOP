import LogIn from "../views/LogIn.vue";
import SubmissionInfo from "../views/SubmissionInfo.vue";
import Review from "../views/Review.vue";
import Sending from "../views/Sending.vue";
import Confirmation from "../views/Confirmation.vue";
import SubmissionError from "../views/SubmissionError.vue";
import SessionEnd from "../views/SessionEnd.vue";
import SubmissionInfoHealthAuth from "../views/SubmissionInfoHealthAuth.vue";
import ReviewHealthAuth from "../views/ReviewHealthAuth.vue";
import SendingHealthAuth from "../views/SendingHealthAuth.vue";
import ConfirmationHealthAuth from "../views/ConfirmationHealthAuth.vue";
import SubmissionErrorHealthAuth from "../views/SubmissionErrorHealthAuth.vue";
import SessionEndHealthAuth from "../views/SessionEndHealthAuth.vue";
import Maintenance from "../views/Maintenance.vue";

// Health authority route
const BASE_HA_URL = '/ha';

export const HealthAuthRoutes = {
  SUBMISSION_INFO: {
    path: BASE_HA_URL + "/submission-info",
    title: "Select a form",
    name: "SubmissionInfoHealthAuth",
    component: SubmissionInfoHealthAuth
  },
  REVIEW: {
    path: BASE_HA_URL + "/review",
    title: "Review",
    name: "ReviewHealthAuth",
    component: ReviewHealthAuth
  },
  SENDING: {
    path: BASE_HA_URL + "/sending",
    title: "Sending application",
    name: "SendingHealthAuth",
    component: SendingHealthAuth
  },
  CONFIRMATION: {
    path: BASE_HA_URL + "/confirmation",
    title: "Confirmation",
    name: "ConfirmationHealthAuth",
    component: ConfirmationHealthAuth
  },
  SUBMISSION_ERROR: {
    path: BASE_HA_URL + "/submission-error",
    title: "Submission error",
    name: "SubmissionErrorHealthAuth",
    component: SubmissionErrorHealthAuth
  },
  SESSION_END: {
    path: BASE_HA_URL + "/session-end",
    title: "Session end",
    name: "SessionEndHealthAuth",
    component: SessionEndHealthAuth
  },
};

export const routes = {
  SIGN_IN: {
    path: "/sign-in",
    title: "Log in",
    name: "LogIn",
    component: LogIn
  },
  SUBMISSION_INFO: {
    path: "/submission-info",
    title: "Select a form",
    name: "SubmissionInfo",
    component: SubmissionInfo
  },
  REVIEW: {
    path: "/review",
    title: "Review",
    name: "Review",
    component: Review
  },
  SENDING: {
    path: "/sending",
    title: "Sending application",
    name: "Sending",
    component: Sending
  },
  CONFIRMATION: {
    path: "/confirmation",
    title: "Confirmation",
    name: "Confirmation",
    component: Confirmation
  },
  SUBMISSION_ERROR: {
    path: "/submission-error",
    title: "Submission error",
    name: "SubmissionError",
    component: SubmissionError
  },
  SESSION_END: {
    path: "/session-end",
    title: "Session end",
    name: "SessionEnd",
    component: SessionEnd
  },
  MAINTENANCE: {
    path: "/maintenance",
    title: "Maintenance",
    name: "Maintenance",
    component: Maintenance
  }
};

export const stepRoutes = [
  { ...routes.SIGN_IN },
  { ...routes.SUBMISSION_INFO },
  { ...routes.REVIEW },
  { ...routes.CONFIRMATION }
];
