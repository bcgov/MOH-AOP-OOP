<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <div class="row align-items-end mt-3">
          <div class="col-9">
            <h1 class="mb-0">Confirmation of Submission</h1>
          </div>
          <div class="col-3 text-right">
            <a href="javascript:void(0)"
              class="print-btn"
              @click="printPage()">Print or Save as PDF
              <font-awesome-icon icon="print" />
            </a>
          </div>
        </div>
        <hr/>
        
        <div class="box-border border border-success rounded">
          <div class="row align-items-center">
            <div class="col-2 pr-0 text-center">
              <div class="status-icon text-success">
                <font-awesome-icon icon="check-circle" />
              </div>
            </div>
            <div class="col-10 pl-0 py-3">
              <p>Your application has been submitted.</p>
              <div class="row">
                <div class="col-md-4 col-lg-3">Date of Submission:</div>
                <div class="col-md-8 col-lg-9"><b>{{ dateToday }}</b></div>
              </div>
              <div class="row">
                <div class="col-md-4 col-lg-3">Reference Number:</div>
                <div class="col-md-8 col-lg-9"><b>Unknown</b></div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="mt-4">Next Steps</h3>
        <hr/>
        <ul>
          <li>Please <a href="javascript:void(0)" @click="printPage()" class="print-link">print</a> this page for your records.</li>
          <li>Health Insurance BC will send you a letter following cancellation of MSP coverage.</li>
          <li>Please contact <a href="https://www2.gov.bc.ca/gov/content/health/about-bc-s-health-care-system/partners/health-insurance-bc" target="_blank">Health Insurance BC</a> if you have any questions.</li>
        </ul>

        <ReviewTableList className='mt-5 mb-5' />
      </div>
    </PageContent>
  </div>
</template>

<script>
import PageContent from '../components/PageContent.vue';
import ReviewTableList from '../components/ReviewTableList.vue';
import { formatDate } from '../helpers/date';

export default {
  name: 'SubmissionPage',
  components: {
    PageContent,
    ReviewTableList,
  },
  data: () => {
    return {
      dateToday: ''
    };
  },
  created() {
    this.dateToday = formatDate(new Date());
  },
  methods: {
    printPage() {
      window.print();
    }
  }
}
</script>

<style scoped>
.print-btn {
  text-decoration: none;
}
.print-link {
  text-decoration: none;
  font-weight: bold;
}
.box-border {
  border-width: 4px !important;
}
.status-icon {
  font-size: 32px;
}
@media (max-width: 991px) {
  .col-2 {
    max-width: 16%;
  }
}

</style>
