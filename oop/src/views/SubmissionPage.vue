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
            <div class="tip-container">
              <font-awesome-icon class="ml-2" icon="info-circle" />
              <div class="tip">To save as a PDF, in the print window, select “Save as PDF”</div>
            </div>
          </div>
        </div>
        <hr/>

        <div class="success-box container">
          <div class="row align-items-center">
            <div class="col-md-1 pr-0 icon-container text-center">
              <font-awesome-icon icon="check-circle" size="3x" />
            </div>
            <div class="col-md-10 pt-2 pb-2">
              <p>Your application has been submitted.</p>
              <div class="row">
                <div class="col-md-4 col-lg-3">Date of Submission:</div>
                <div class="col-md-8 col-lg-9"><b>{{ submissionDate }}</b></div>
              </div>
              <div class="row">
                <div class="col-md-4 col-lg-3">Reference Number:</div>
                <div class="col-md-8 col-lg-9"><b>{{referenceNumber}}</b></div>
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
import pageStateService from '../services/page-state-service';
import { routes } from '../router/routes';
import {
  MODULE_NAME as formModule,
  RESET_FORM
} from '../store/modules/form';
import { scrollTo } from '../helpers/scroll';

export default {
  name: 'SubmissionPage',
  components: {
    PageContent,
    ReviewTableList,
  },
  data: () => {
    return {
      submissionDate: '',
      referenceNumber: '',
    };
  },
  created() {
    this.submissionDate = formatDate(this.$store.state.form.submissionDate);
    this.referenceNumber = this.$store.state.form.referenceNumber || 'Unknown';
  },
  methods: {
    printPage() {
      window.print();
    }
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
.fa-check-circle {
  color: rgba(46, 133, 64, 1);
}

.tip-container {
  position: relative;
  display: inline-block;
  color: black;
}

/* Tooltip text */
.tip-container .tip {
  visibility: hidden;
  width: 220px;
  background-color: #f2f2f2;
  color: #606060;
  text-align: center;
  padding: 2px 4px;
  border: 2px solid #606060;
  font-weight: normal;
  font-size: 16px;
  right: 25px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tip-container:hover .tip {
  visibility: visible;
}

.success-box {
  border-radius: 10px;
  border: 5px solid rgba(46, 133, 64, 1);
  padding: 10px;
}

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

</style>
