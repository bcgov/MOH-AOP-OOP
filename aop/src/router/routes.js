import SignIn from "../views/SignIn.vue";
import SubmissionInfo from "../views/SubmissionInfo.vue";
import Review from "../views/Review.vue";
import Sending from "../views/Sending.vue";
import Submission from "../views/Submission.vue";
import SubmissionError from "../views/SubmissionError.vue";

export const routes = {
  SIGN_IN: {
    path: "/sign-in",
    title: "Sign In",
    name: "SignIn",
    component: SignIn
  },
  SUBMISSION_INFO: {
    path: "/submission-info",
    title: "Submission Info",
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
  SUBMISSION: {
    path: "/submission",
    title: "Submission",
    name: "Submission",
    component: Submission
  },
  SUBMISSION_ERROR: {
    path: "/submission-error",
    title: "Submission Error",
    name: "SubmissionError",
    component: SubmissionError
  }
};
export default routes;
