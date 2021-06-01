<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Review request</h1>
        <p>Review your request before submission</p>
        <hr/>
        <ReviewTableList :showEditButtons='true' 
                        tableBackgroundColor='#EEE'/>
        <div v-if="isSystemUnavailable"
            class="text-danger mt-3 mb-5"
            aria-live="assertive">Unable to continue, system unavailable. Please try again later.</div>
      </div>
    </PageContent>
    <ContinueBar @continue='submitForm()'
                :hasLoader='isLoading'
                buttonLabel='Submit'/>
  </div>
</template>

<script>
import PageContent from '../components/PageContent.vue';
import ContinueBar from '../components/ContinueBar.vue';
import ReviewTableList from '../components/ReviewTableList.vue';
import pageStateService from '../services/page-state-service';
import {
  routes,
  isPastPath
} from '../router/routes';
import {
  scrollTo,
  scrollToError,
  getTopScrollPosition
} from '../helpers/scroll';
import {
  MODULE_NAME as formModule,
  RESET_FORM,
  SET_ADDRESS_LINES,
  SET_PROVINCE,
  SET_REFERENCE_NUMBER,
  SET_SUBMISSION_DATE
} from '../store/modules/form';
import apiService from '../services/api-service';
import logService from '../services/log-service';

export default {
  name: 'ReviewPage',
  components: {
    PageContent,
    ContinueBar,
    ReviewTableList,
  },
  data: () => {
    return {
      isLoading: false,
      isSystemUnavailable: false,
    }
  },
  created() {
    logService.logNavigation(
      this.$store.state.form.applicationUuid,
      routes.REVIEW_PAGE.path,
      routes.REVIEW_PAGE.title
    );
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      this.isSystemUnavailable = false;

      this.$store.dispatch(formModule + '/' + SET_SUBMISSION_DATE, new Date());

      const token = this.$store.state.form.captchaToken;
      const applicationUuid = this.$store.state.form.applicationUuid;
      const formState = this.$store.state.form;

      // Append city and state into one field - addressLines[1] if country is USA
      if(this.$store.state.form.country == 'United States'){
        const appendedCityState = this.$store.state.form.addressLines[1].value + ' ' + this.$store.state.form.province + ' USA';
        const addressLines = [...formState.addressLines];
        addressLines[1].value = appendedCityState;
        this.$store.dispatch(formModule + '/' + SET_ADDRESS_LINES, addressLines);
        this.$store.dispatch(formModule + '/' + SET_PROVINCE, null);
      }
      
      apiService.submitApplication(token, formState)
        .then((response) => {
          // Handle HTTP success.
          const returnCode = response.data.returnCode;
          const referenceNumber = response.data.referenceNumber;

          this.isLoading = false;

          switch (returnCode) {
            case '0': // Submission successful.
              logService.logSubmission(applicationUuid, {
                event: 'submission',
                response: response.data,
              }, referenceNumber);
              this.$store.dispatch(formModule + '/' + SET_REFERENCE_NUMBER, referenceNumber);
              this.navigateToSubmissionPage();
              break;
            case '1': // Submission failed.
            case '2': // Unknown case, but not '0', so failing the the submission.
              logService.logError(applicationUuid, {
                event: 'submission failure',
                response: response.data,
              });
              this.navigateToSubmissionErrorPage();
              break;
            case '3': // System unavailable.
              this.isSystemUnavailable = true;
              logService.logError(applicationUuid, {
                event: 'submission failure',
                response: response.data,
              });
              scrollToError();
              break;
          }
        })
        .catch((error) => {
          // Handle HTTP error.
          const httpStatusCode = error && error.response ? error.response.status : null;
          this.isLoading = false;
          this.isSystemUnavailable = true;
          logService.logError(applicationUuid, {
            event: 'HTTP error while sending application',
            status: httpStatusCode
          });
          scrollToError();
        });
      
      // Manually navigate to submission success page when middleware/RAPID is down.
      // this.navigateToSubmissionPage();
    },
    navigateToSubmissionPage() {
      const path = routes.SUBMISSION_PAGE.path;
      pageStateService.setPageComplete(path);
      pageStateService.visitPage(path);
      this.$router.push(path);
      scrollTo();
    },
    navigateToSubmissionErrorPage() {
      const path = routes.SUBMISSION_ERROR_PAGE.path;
      pageStateService.setPageComplete(path);
      pageStateService.visitPage(path);
      this.$router.push(path);
      scrollTo();
    }
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (to.path === routes.HOME_PAGE.path) {
      this.$store.dispatch(formModule + '/' + RESET_FORM);
      next();
    } else if ((pageStateService.isPageComplete(to.path)) || isPastPath(to.path, from.path)) {
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      next({
        path: routes.REVIEW_PAGE.path,
        replace: true
      });
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  }
}
</script>