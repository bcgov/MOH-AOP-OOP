import moduleNames from './module-names';
import EnrolmentHome from './modules/enrolment/components/EnrolmentHome.vue';
import EnrolmentPersonalInfo from './modules/enrolment/components/EnrolmentPersonalInfo.vue';
import EnrolmentReview from './modules/enrolment/components/EnrolmentReview.vue';
import EnrolmentSending from './modules/enrolment/components/EnrolmentSending.vue';
import EnrolmentSubmission from './modules/enrolment/components/EnrolmentSubmission.vue';
import EnrolmentSubmissionError from './modules/enrolment/components/EnrolmentSubmissionError.vue';
import LandingPage from './modules/LandingPage.vue';

const BASE_URL = '/msp/';

export const routes = {
  LANDING_PAGE: {
    path: BASE_URL + 'landing',
    title: 'Landing Page',
    name: 'LandingPage',
    component: LandingPage
  },
  ENROLMENT_HOME: {
    path: BASE_URL + moduleNames.ENROLMENT + '/home',
    title: 'Check Eligibility',
    name: moduleNames.ENROLMENT + 'Home',
    component: EnrolmentHome
  },
  ENROLMENT_PERSONAL_INFO: {
    path: BASE_URL + moduleNames.ENROLMENT + '/personal-info',
    title: 'Personal Info',
    name: moduleNames.ENROLMENT + 'PersonalInfo',
    component: EnrolmentPersonalInfo
  },
  ENROLMENT_REVIEW: {
    path: BASE_URL + moduleNames.ENROLMENT + '/review',
    title: 'Review',
    name: moduleNames.ENROLMENT + 'Review',
    component: EnrolmentReview
  },
  ENROLMENT_SENDING: {
    path: BASE_URL + moduleNames.ENROLMENT + '/sending',
    title: 'Sending Application',
    name: moduleNames.ENROLMENT + 'Sending',
    component: EnrolmentSending
  },
  ENROLMENT_SUBMISSION: {
    path: BASE_URL + moduleNames.ENROLMENT + '/submission',
    title: 'Submission',
    name: moduleNames.ENROLMENT + 'Submission',
    component: EnrolmentSubmission
  },
  ENROLMENT_SUBMISSION_ERROR: {
    path: BASE_URL + moduleNames.ENROLMENT + '/submission-error',
    title: 'Submission Error',
    name: moduleNames.ENROLMENT + 'SubmissionError',
    component: EnrolmentSubmissionError
  }
}
export default routes;