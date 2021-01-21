import Home from './modules/assignment-of-payment/components/Home.vue';
import SubmissionInfo from './modules/assignment-of-payment/components/SubmissionInfo.vue';
import Review from './modules/assignment-of-payment/components/Review.vue';
import Sending from './modules/assignment-of-payment/components/Sending.vue';
import Submission from './modules/assignment-of-payment/components/Submission.vue';
import SubmissionError from './modules/assignment-of-payment/components/SubmissionError.vue';

export const routes = {
  HOME: {
    path: '/home',
    title: 'Authorization',
    name: 'Home',
    component: Home
  },
  SUBMISSION_INFO: {
    path: '/submission-info',
    title: 'Submission Info',
    name: 'SubmissionInfo',
    component: SubmissionInfo
  },
  REVIEW: {
    path: '/review',
    title: 'Review',
    name: 'Review',
    component: Review
  },
  SENDING: {
    path: '/sending',
    title: 'Sending Application',
    name: 'Sending',
    component: Sending
  },
  SUBMISSION: {
    path: '/submission',
    title: 'Submission',
    name: 'Submission',
    component: Submission
  },
  SUBMISSION_ERROR: {
    path: '/submission-error',
    title: 'Submission Error',
    name: 'SubmissionError',
    component: SubmissionError
  }
}
export default routes;
