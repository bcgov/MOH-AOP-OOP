import SignIn from "../views/SignIn.vue";
import SubmissionInfo from "../views/SubmissionInfo.vue";
import Review from "../views/Review.vue";
import Sending from "../views/Sending.vue";
import Confirmation from "../views/Confirmation.vue";
import SubmissionError from "../views/SubmissionError.vue";
import SessionEnd from "../views/SessionEnd.vue";

export const routes = {
  SIGN_IN: {
    path: "/sign-in",
    title: "Sign In",
    name: "SignIn",
    component: SignIn
  },
  SUBMISSION_INFO: {
    path: "/submission-info",
    title: "Select a Form",
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
    title: "Sending Application",
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
    title: "Submission Error",
    name: "SubmissionError",
    component: SubmissionError
  },
  SESSION_END: {
    path: "/session-end",
    title: "Session End",
    name: "SessionEnd",
    component: SessionEnd
  }
};

export const stepRoutes = [
  { ...routes.SIGN_IN },
  { ...routes.SUBMISSION_INFO },
  { ...routes.REVIEW },
  { ...routes.CONFIRMATION }
];
