<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">

        <div class="box-border border border-danger rounded">
          <div class="row align-items-center">
            <div class="col-2 pr-0 text-center">
              <div class="status-icon text-danger">
                <font-awesome-icon icon="times-circle" />
              </div>
            </div>
            <div class="col-10 pl-0 py-3">
              <h1>There was a technical issue with your submission</h1>
              <p>Your application was not submitted.</p>
            </div>
          </div>
        </div>

      </div>
    </PageContent>
  </div>
</template>

<script>
import PageContent from '../components/PageContent.vue';
import pageStateService from '../services/page-state-service';
import { routes } from '../router/routes';
import {
  MODULE_NAME as formModule,
  RESET_FORM
} from '../store/modules/form';
import { scrollTo } from '../helpers/scroll';
import logService from '../services/log-service';

export default {
  name: 'SubmissionErrorPage',
  components: {
    PageContent,
  },
  created() {
    logService.logNavigation(
      this.$store.state.form.applicationUuid,
      routes.SUBMISSION_ERROR_PAGE.path,
      routes.SUBMISSION_ERROR_PAGE.title
    );
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    this.$store.dispatch(formModule + '/' + RESET_FORM);
    if (to.path === routes.HOME_PAGE.path) {
      next();
    } else {
      next({ name: routes.HOME_PAGE.name });
    }
    setTimeout(() => {
      scrollTo(0);
    }, 0);
  }
}
</script>

<style scoped>
.box-border {
  border-width: 4px !important;
}
.status-icon {
  font-size: 32px;
}
</style>
