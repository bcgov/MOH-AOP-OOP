<template>
  <div>
    <button class="print-button" v-on:click="print()">Print <i class="fa fa-print fa-2x"></i></button>
    <h1>Confirmation Message</h1>
    <hr>
    <div class="success-box container">
      <div class="row">
        <div class="col-2 icon-container">
          <i class="fas fa-5x fa-check-circle"></i>
        </div>

        <div class="col-10">
          <p>Your {{ selectedForm }} form has been successfully submitted</p>
          <p>{{ date }} - Reference Number: <strong>{{ referenceNumber }}</strong></p>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-10">
        <h2>Submitter Information</h2>
        <hr>
      </div>
    </div>
    <Table :elements='submitterData' />

    <div class="row mt-5">
      <div class="col-10">
        <h2>Submission Information</h2>
        <hr>
      </div>
    </div>
    <Table :elements='submissionData' />
    
    <div class="row mt-5">
      <div class="col-10">
        <h2>Supporting Documents</h2>
        <hr>
      </div>
    </div>
    <Table :elements='supportingDocuments' />

    <Button label="New Form"
            styling="bcgov-normal-blue btn mb"
            v-on:button-click='newForm' />
  </div>
</template>

<script>
import strings from '../../../locale/strings.en';
import Button from '../../common/components/Button';
import Table from '../../common/components/Table';
import routes from '../../../routes';
import pageStateService from '../../common/services/page-state-service';
import { scrollTo } from '../../common/helpers/scroll';

export default {
  name: 'Submission',
  components: {
    Button,
    Table
  },
  data: () => {
    return {
      selectedForm: '',
      date: Date.now().toString(),
      referenceNumber: 'A123456789',
      submitterData: [],
      submissionData: [],
      supportingDocuments: []
    };
  },
  created() {
    switch (this.$store.state.uploadType) {
      case 'aop': 
        this.selectedForm = 'Diagnostic Facility Services Assignment of Payment and Medical Director Authorization';
        break;
      case 'coaop':
        this.selectedForm = 'Diagnostic Facility Services Cancellation of Assignment of Payment';
        break;
      case 'oopa':
        this.selectedForm = 'Laboratory Services Outpatient Operator Payment Administration';
        break;
    }

    this.submitterData = [
      { name: 'First Name', value: this.$store.state.firstName },
      { name: 'Last Name', value: this.$store.state.lastName },
      { name: 'Email Address', value: this.$store.state.emailAddress },
      { name: 'Phone Number', value: this.$store.state.phoneNumber },
      { name: 'Facility Name:', value: this.$store.state.facility || 'N/A' },
      { name: 'Organization:', value: this.$store.state.organization || 'N/A' },
    ];

    this.submissionData = [
      { name: 'Submission Type', value: this.$store.state.submissionType },
      { name: 'Primary Practitioner Number', value: this.$store.state.primaryNumber },
      { name: 'Primary Practitioner Last Name', value: this.$store.state.primaryLastName },
      { name: 'Secondary Practitioner Number', value: this.$store.state.secondaryNumber || 'N/A' },
      { name: 'Secondary Practitioner Last Name', value: this.$store.state.secondaryLastName || 'N/A' },
      { name: 'Comments', value: this.$store.state.comments || 'N/A' },
    ];
    
    if (this.$store.state.uploadType === 'aop') {
      this.supportingDocuments = this.$store.state.uploadedForms.map((item, i) => {
        return { name: `AOP Form - ${i + 1}`, value: item.name }
      });
    } else if (this.$store.state.uploadType === 'coaop') {
      this.supportingDocuments = this.$store.state.uploadedForms.map((item, i) => {
        return { name: `CAOP Form - ${i + 1}`, value: item.name }
      });
    } else if (this.$store.state.uploadType === 'oopa') {
      this.supportingDocuments = this.$store.state.uploadedForms.map((item, i) => {
        return { name: `OOPA Form - ${i + 1}`, value: item.name }
      });
    }

    if (this.$store.state.uploadedCredentials.length > 0) {
      const credentials = this.$store.state.uploadedCredentials.map((item, i) => {
        return { name: `Credentials - ${i + 1}`, value: item.name };
      });
      this.supportingDocuments = [...this.supportingDocuments, ...credentials];
    }
  },
  methods: {
    newForm() {
      pageStateService.setPageIncomplete(routes.SUBMISSION.path);
      const path = routes.SUBMISSION_INFO.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    },
    print() {
      window.print();
      return false;
    }
  },
  beforeRouteLeave(to, from, next) {
    // Check for `hasConfirmedPageLeave` because of double navigation to home page.
    if (this.hasConfirmedPageLeave || window.confirm(strings.NAVIGATION_CONFIRMATION_PROMPT)) {
      this.hasConfirmedPageLeave = true;
      next();
    } else {
      next(false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.fa-check-circle {
  color: rgba(112, 182, 3, 1);
}

.success-box {
  border-radius: 10px;
  border: 5px solid rgba(112, 182, 3, 1);
  padding: 10px;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
} 

.btn {
  float: right;
}

.print-button {
  float: right;
  background: none;
  border: none;
  color: #0000EE;
}

.print-button i {
  color: black;
}

.mb {
  margin-bottom: 80px;
}
</style>
