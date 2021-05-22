<template>
  <div>
    <ConsentModal v-if="showConsentModal"
                  @close="handleCloseConsentModal" />
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-5">
        <h1>MSP permanent move outside of British Columbia</h1>
        <hr/>
        <h2>Who can complete this form</h2>
        <p>If you are permanently moving out of British Columbia (B.C.), you must notify Health Insurance BC (HIBC) of your departure date and your new address.</p>
        <ul>
          <li><b>If you are moving within Canada:</b> coverage is provided for the remainder of the month in which you leave the province plus the next two months. If required, your coverage may be extended for up to three extra months to cover you while in transit. Upon arrival, you should immediately apply to the health plan of the new province or territory.</li>
          <li><b>If you are moving outside Canada:</b> coverage is provided for the remainder of the month in which you leave the province.</li>
        </ul>
        <br/>
        <div class="row">
          <div class="col-md-6">
            <h2>Requirements</h2>
            <p>Your Personal Health Number (PHN) is the 10 digit number that can be found on the back of your <a href="https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/personal-health-identification/your-bc-services-card" target="_blank">BC Services Card</a> (or front of your CareCard if you still have one).</p>
          </div>
          <div class="col-md-6">
            <img
            alt="BC Services Card Sample"
            src="/oop/images/bcid-sample.jpg"
            class="bcid"
            />
          </div>
        </div>
        <br/>
        <h2>What happens after completing this form</h2>
        <p>HIBC will process your request. We will contact you by mail (if address is provided) if there are any issues cancelling your MSP coverage. A confirmation letter will be sent to your new address following cancellation of coverage.</p>
        <br>
        <h2>Time required to complete this form</h2>
        <p>10-15 minutes</p>
      </div>
    </PageContent>
    <ContinueBar @continue='nextPage()'/>
  </div>
</template>

<style scoped>
.bcid {
  width: auto;
  max-width: 100%;
  height: auto;
}
</style>

<script>
import pageStateService from '../services/page-state-service';
import spaEnvService from '../services/spa-env-service';
import { routes } from '../router/routes';
import {
  scrollTo,
  getTopScrollPosition
} from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import PageContent from '../components/PageContent.vue';
import ConsentModal from '../components/ConsentModal.vue';
import { v4 as uuidv4 } from 'uuid';
import {
  MODULE_NAME as formModule,
  SET_APPLICATION_UUID
} from '../store/modules/form';
import logService from '../services/log-service';

export default {
  name: 'HomePage',
  components: {
    ConsentModal,
    ContinueBar,
    PageContent,
  },
  data: () => {
    return {
      showConsentModal: true,
    }
  },
  async created() {
    const applicationUuid = uuidv4();
    this.$store.dispatch(formModule + '/' + SET_APPLICATION_UUID, applicationUuid);
    // Load environment variables, and route to maintenance page.
    await spaEnvService.loadEnvs()
      .then(() => {
        if (spaEnvService.values && spaEnvService.values.SPA_ENV_OOP_MAINTENANCE_FLAG === "true") {
          const toPath = routes.MAINTENANCE_PAGE.path;
          pageStateService.setPageComplete(toPath);
          pageStateService.visitPage(toPath);
          this.$router.push(toPath);
        }
      })
      .catch((error) => {
        logService.logError(applicationUuid, {
          event: 'HTTP error getting values from spa-env-server',
          status: error.response.status,
        });
      });
    logService.logNavigation(
      applicationUuid,
      routes.HOME_PAGE.path,
      routes.HOME_PAGE.title
    );
  },
  methods: {
    handleCloseConsentModal() {
      this.showConsentModal = false;
    },
    nextPage() {
      const path = routes.YOUR_INFO_PAGE.path;
      pageStateService.setPageComplete(path);
      pageStateService.visitPage(path);
      this.$router.push(path);
      scrollTo(0);
    }
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (pageStateService.isPageComplete(to.path)) {
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      next({
        path: routes.HOME_PAGE.path,
        replace: true
      });
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  }
}
</script>
