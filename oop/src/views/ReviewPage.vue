<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Review request</h1>
        <p>Review your request before submission</p>
        <hr/>
        <ReviewTableList :showEditButtons='true' />
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
import { routes } from '../router/routes';

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

      setTimeout(() => {
        this.isLoading = false;

        this.navigateToSubmissionPage();
      }, 1000);
    },
    navigateToSubmissionPage() {
      const path = routes.SUBMISSION_PAGE.path;
      pageStateService.visitPage(path);
      this.$router.push(path);
    }
  }
}
</script>