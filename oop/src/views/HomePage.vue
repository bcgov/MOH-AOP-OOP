<template>
  <div class="home">
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>MSP permanent move outside of British Columbia</h1>
        <hr/>
        <h2>Who can complete this form</h2>
        <p>If you will no longer be a resident of British Columbia (B.C.), you must notify Health Insurance BC (HIBC) of the date of your departure and your new address</p>
        <ul>
          <li><b>If you are moving within Canada:</b> coverage is provided for the balance of the month in which you leave the province plus two consecutive months. If required, coverage may be extended for up to three extra months to cover you while in transit. Upon arrival, you should immediately apply to the health plan of the new province or territory.</li> <br>
          <li><b>If you are moving outside Canada:</b> coverage is provided for the balance of the month in which you leave the province.</li>
        </ul>
        <br/>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h2>Requirements</h2>
              <p>Personal Health Number (PHN), which is the 10 digit number that can be found on the back of the BC Services Card (or front of the CareCard if you still have one).</p>
            </div>
            <div class="col-md-6">
              <img
              alt="BC Services Card Sample"
              src="/images/bcid-sample.jpg"
              class="bcid"
              />
            </div>
          </div>
        </div>
        <br/>
        <div class="container">
          <h2>What happens after completing this form</h2>
          <p>After completing the form, Health Insurance BC will send a confirmation letter to your address on file. It is important to provide a complete and accurate new address in this form. After you submit the form, HIBC will send a confirmation letter to your new address. HIBC will use the new address to contact you with any further correspondence.</p>
          <br>
          <h2>Time required to complete this form</h2>
          <p>10-15 minutes</p>
        </div>
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

export default {
  name: 'HomePage',
  components: {
    ContinueBar,
    PageContent,
  },
  methods: {
    nextPage() {
      const path = routes.YOUR_INFO_PAGE.path;
      pageStateService.visitPage(path);
      this.$router.push(path);
      scrollTo(0);
    }
  }
}
</script>
