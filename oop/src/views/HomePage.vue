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
            src="/images/bcid-sample.jpg"
            class="bcid"
            />
          </div>
        </div>
        <br/>
        <h2>What happens after completing this form</h2>
        <p>HIBC will process your request. We will contact you by email (if provided) or mail if there are any issues cancelling your MSP coverage. A confirmation letter will be sent to your new address following cancellation of  coverage.</p>
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
import routes from '../router/routes';
import { scrollTo } from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import PageContent from '../components/PageContent.vue';
import ConsentModal from '../components/ConsentModal.vue';

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
  methods: {
    handleCloseConsentModal() {
      this.showConsentModal = false;
    },
    nextPage() {
      const path = routes.YOUR_INFO_PAGE.path;
      pageStateService.visitPage(path);
      this.$router.push(path);
      scrollTo(0);
    }
  }
}
</script>
