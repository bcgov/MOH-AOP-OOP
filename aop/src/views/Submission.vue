<template>
  <div>
    <button class="print-button" v-on:click="print()">
      <span>Save</span> <i class="far fa-save fa-2x"></i> <span>Print</span> <i class="fa fa-print fa-2x"></i>
    </button>
    <h1>Confirmation Message</h1>
    <hr />
    <div class="success-box container">
      <div class="row">
        <div class="col-2 icon-container">
          <i class="fas fa-5x fa-check-circle"></i>
        </div>

        <div class="col-10">
          <p>Your {{ selectedForm }} form has been successfully submitted</p>
          <p>
            {{ date }} - Reference Number:
            <strong>{{ referenceNumber }}</strong>
          </p>
        </div>
      </div>
    </div>
    <p class="mt-3">Thank you for submitting your completed form.</p>

    <h2>Important</h2>
    <hr>
    <ul>
      <li>Full processing of an Assignment of Payment can take up to 30 days.</li>
      <li>All Assignments of Payment must be processed within 90 days of the first date of service indicated on the AOP form in order to recieve payment from the Medical Services Plan.</li>
      <li>It is recommended that AOP forms are submitted within 60 days of first date of service.</li>
      <li>Health Insurance BC (HIBC) will provide email confirmation to the submitter when full processing of an AOP form has been completed.</li>
      <li>For information on your specifica AOP submission, contact HIBC:</li>
      Email: <a href="mailto:HIBC.AOP@gov.bc.ca">HIBC.AOP@gov.bc.ca</a>
      <br>
      Telephone: <strong>Dial 1-8666-456-6950</strong>
      <ul>
        <li>Hold for options to be presented; then select:</li>
        <li>Option 3 (provider services): then</li>
        <ul>
          <li>Option 1 (AOP self-service processing confirmation)</li>
          <li>Option 2 (Anything else) - this will ring through to an agent</li>
          <li>Option 3 (Assignment of Payment)</li>
        </ul>
      </ul>
      <li>For more information concerning the Assignment of Payment process, see: <a href="www.gov.bc.ca/diagnosticfacilities">www.gov.bc.ca/diagnosticfacilities</a></li>
    </ul>

    <h2 class="mt-4">Submitter Information</h2>
    <hr />
    <Table :elements="submitterData" />

    <h2 class="mt-4">Information About This Submission</h2>
    <hr />
    <div v-if="$store.state.uploadType !== 'COAOP'" class="submission-type">
      <div class="name">
        <div>
          <strong>Submission Type:</strong>
        </div>
      </div>
      <div class="radios">
        <div class="radio-group">
          <input
              type="radio"
              id="new"
              value="New Submission"
              name="submissionType"
              v-model="$store.state.submissionType"
              disabled
            />&nbsp;
            <label for="new">New Submission</label>
        </div>
        <div class="radio-group">
          <input
            type="radio"
            id="revised"
            value="Revised Submission"
            name="submissionType"
            v-model="$store.state.submissionType"
            disabled
          />&nbsp;
          <label for="revised">Revised Submission</label>
        </div>
      </div>
    </div>
    <Table :elements="submissionData" />

    
    <h2 class="mt-4">Supporting Documents</h2>
    <hr />
    <Table :elements="supportingDocuments" />

    <Button
      label="New Form"
      styling="bcgov-normal-blue btn mb"
      v-on:button-click="newForm"
    />
  </div>
</template>

<script>
import strings from "../locale/strings.en";
import Button from "../components/Button";
import Table from "../components/Table";
import routes from "../router/routes";
import pageStateService from "../services/page-state-service";
import { scrollTo } from "../helpers/scroll";

export default {
  name: "Submission",
  components: {
    Button,
    Table
  },
  data: () => {
    return {
      selectedForm: "",
      date: "",
      referenceNumber: "A123456789",
      submitterData: [],
      submissionData: [],
      supportingDocuments: []
    };
  },
  created() {
    const date = new Date();
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthList[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    this.date = `${month} ${day}, ${year}`

    switch (this.$store.state.uploadType) {
      case "AOP":
        this.selectedForm =
          "Diagnostic Facility Services Assignment of Payment and Medical Director Authorization (HLTH 1908)";
        break;
      case "COAOP":
        this.selectedForm =
          "Diagnostic Facility Services Cancellation of Assignment of Payment (HLTH 1926)";
        break;
      case "OOPA":
        this.selectedForm =
          "Laboratory Services Outpatient Operator Payment Administration (HLTH 2999)";
        break;
    }

    if (this.$store.state.uploadType === "AOP" || this.$store.state.uploadType === "COAOP") {
      this.submitterData = [
        { name: "First Name:", value: this.$store.state.firstName },
        { name: "Last Name:", value: this.$store.state.lastName },
        { name: "Email Address:", value: this.$store.state.emailAddress },
        { name: "Phone Number:", value: this.$store.state.phoneNumber },
        { name: "Organization:", value: this.$store.state.organization }
      ];
    } else {
      this.submitterData = [
        { name: "First Name:", value: this.$store.state.firstName },
        { name: "Last Name:", value: this.$store.state.lastName },
        { name: "Email Address:", value: this.$store.state.emailAddress },
        { name: "Phone Number:", value: this.$store.state.phoneNumber },
        { name: "Facility Name:", value: this.$store.state.facility }
      ];
    }

    if (this.$store.state.uploadType === "AOP" || this.$store.state.uploadType === "COAOP") {
      this.submissionData = [
        { name: "Practitioner Number:", value: this.$store.state.primaryNumber },
        { name: "Practitioner Last Name:", value: this.$store.state.primaryLastName },
        { name: "Comments:", value: this.$store.state.comments }
      ];
    } else {
      this.submissionData = [
        { name: "Primary Practitioner Number:", value: this.$store.state.primaryNumber },
        { name: "Primary Practitioner Last Name:", value: this.$store.state.primaryLastName },
        { name: "Secondary Practitioner Number:", value: this.$store.state.secondaryNumber },
        { name: "Secondary Practitioner Last Name:", value: this.$store.state.secondaryLastName },
        { name: "Comments:", value: this.$store.state.comments }
      ]
    }

    if (this.$store.state.uploadType === "AOP") {
      if (this.$store.state.uploadedForms.length > 1) {
        const label = this.$store.state.uploadedForms[0].name.slice(0, -6); 
        this.supportingDocuments = [ { name: 'HLTH 1908 Form:', value: label} ];
      } else {
        const label = this.$store.state.uploadedForms[0].name;
        this.supportingDocuments = [ { name: 'HLTH 1908 Form:', value: label } ];
      }
    } else if (this.$store.state.uploadType === "COAOP") {
      if (this.$store.state.uploadedForms.length > 1) {
        const label = this.$store.state.uploadedForms[0].name.slice(0, -6); 
        this.supportingDocuments = [ { name: 'HLTH 1926 Form:', value: label} ];
      } else {
        const label = this.$store.state.uploadedForms[0].name;
        this.supportingDocuments = [ { name: 'HLTH 1926 Form:', value: label } ];
      }
    } else if (this.$store.state.uploadType === "OOPA") {
      if (this.$store.state.uploadedForms.length > 1) {
        const label = this.$store.state.uploadedForms[0].name.slice(0, -6); 
        this.supportingDocuments = [ { name: 'HLTH 2999 Form:', value: label} ];
      } else {
        const label = this.$store.state.uploadedForms[0].name;
        this.supportingDocuments = [ { name: 'HLTH 2999 Form:', value: label } ];
      }
    }

    if (this.$store.state.uploadedCredentials && this.$store.state.uploadedCredentials.length > 0) {
      let credentials;
      if (this.$store.state.uploadedCredentials.length > 1) {
        const label = this.$store.state.uploadedCredentials[0].name.slice(0, -6);
        credentials = [ { name: "Credentials Document:", value: label } ];
      } else {
        const label = this.$store.state.uploadedCredentials[0].name;
        credentials = [ { name: "Credentials Document:", value: label } ];

      }
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
    if (
      this.hasConfirmedPageLeave ||
      window.confirm(strings.NAVIGATION_CONFIRMATION_PROMPT)
    ) {
      this.hasConfirmedPageLeave = true;
      next();
    } else {
      next(false);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
  color: #0000ee;
}

.print-button i {
  color: black;
  margin-right: 8px;
}

.print-button span {
  margin-right: 8px;
}

.mb {
  margin-bottom: 80px;
}

.submission-type {
  background: #eee;
  padding: 4px 8px 0 8px;
  display: flex;
  flex: 1;
  align-items: center;

  .name {
    width: 50%;
  }

  .radios {
    width: 50%;
    padding: 0 6px;
  }
}

label {
  margin: 0;
}

input[type="radio"] {
  width: 18px;
  height: 18px;
}

.radio-group {
  display: flex;
  align-items: center;
  * {
    margin-right: 6px;
  }
}
</style>
