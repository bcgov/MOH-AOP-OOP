<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Review request</h1>
        <p>Review your request before submission</p>
        <hr/>
        <ReviewTableList :showEditButtons='true' 
                        tableBackgroundColor='#EEE'/>
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
  getTopScrollPosition
} from '../helpers/scroll';
import {
  MODULE_NAME as formModule,
  RESET_FORM
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
      isLoading: false
    }
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      
      const token = this.$store.state.form.captchaToken;

      apiService.submitApplication(token)
        .then(() => {
          // Handle success.
          logService.logSubmission({ message: 'Success', error: null }, 'TEMP_UUID', 'TEMP_REF_NUMBER');
        })
        .catch(() => {
          // Handle error.
          logService.logSubmission({ message: 'Error sending application', error: 'TEMP_ERROR' }, 'TEMP_UUID', 'TEMP_REF_NUMBER');
        })
        .then(() => {
          // Always executed.
          this.isLoading = false;
        });
      
      // Temporarily calling this outside the ApiService promise until middleware is setup.
      this.navigateToSubmissionPage();
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
      const topScrollPosition = getTopScrollPosition();
      next(false);
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  }
}
</script>