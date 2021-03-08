<template>
  <div>
    <div class="buttons">
      <button class="print-button" v-on:click="print()">
        <span>Save</span> <i class="far fa-save fa-2x"></i>
      </button>
      <button class="print-button" v-on:click="print()">
        <span>Print</span> <i class="fa fa-print fa-2x"></i>
      </button>
    </div>
    <h1>Confirmation Message</h1>
    <hr />
    <div class="success-box container">
      <div class="row">
        <div class="col-2 icon-container">
          <i class="fas fa-4x fa-check-circle"></i>
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
    <!-- AOP -->
    <ul v-if="$store.state.uploadType === 'AOP' || $store.state.uploadType === 'COAOP'">
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
        <li>Option 3 (provider services); then</li>
        <ul>
          <li>Option 3 again (Assignment of Payment)</li>
          <ul>
            <li>Option 1 (AOP self-service processing confirmation) Or</li>
            <li>Option 2 (anything else) - this will ring through to an agent</li>
          </ul>
        </ul>
      </ul>
      <li>For more information concerning the Assignment of Payment process, see: <a href="www.gov.bc.ca/diagnosticfacilities">www.gov.bc.ca/diagnosticfacilities</a></li>
    </ul>

    <!-- OPA -->
    <ul v-else>
      <li>Full processing of an Operator Payment Administration can take up to 30 days.</li>
      <li>All Operator Payment Administration must be processed within 90 days of the first date of service indicated on the AOP form in order to recieve payment from the Medical Services Plan.</li>
      <li>It is recommended that OPA forms are submitted within 60 days of first date of service.</li>
      <li>Health Insurance BC (HIBC) will provide email confirmation to the submitter when full processing of an OPA form has been completed.</li>
      <li>For information on your specifica OPA submission, contact HIBC:</li>
      Email: <a href="mailto:HIBC.AOP@gov.bc.ca">HIBC.AOP@gov.bc.ca</a>
      <br>
      Telephone: <strong>Dial 1-8666-456-6950</strong>
      <ul>
        <li>Hold for options to be presented; then select:</li>
        <li>Option 3 (provider services); then</li>
        <ul>
          <li>Option 3 again (Assignment of Payment)</li>
          <ul>
            <li>Option 1 (AOP self-service processing confirmation) Or</li>
            <li>Option 2 (anything else) - this will ring through to an agent</li>
          </ul>
        </ul>
      </ul>
      <li>For more information concerning the Operator Payment Administration process, see: <a href="www.gov.bc.ca/diagnosticfacilities">www.gov.bc.ca/diagnosticfacilities</a></li>
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
import Button from "../components/Button";
import Table from "../components/Table";
import routes from "../router/routes";
import pageStateService from "../services/page-state-service";
import { scrollTo } from "../helpers/scroll";
import { SET_UPLOAD_TYPE, SET_CREDENTIALS_REQUIRED, SET_SUBMISSION_TYPE, SET_PRIMARY_LAST_NAME, SET_PRIMARY_NUMBER, SET_SECONDARY_LAST_NAME, SET_SECONDARY_NUMBER, SET_UPLOADED_FORMS, SET_UPLOADED_CREDENTIALS, SET_COMMENTS } from '../store/index';

export default {
  name: "Confirmation",
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
      const label = this.$store.state.uploadedForms[0].name.slice(0, -6); 
      this.supportingDocuments = [ { name: 'HLTH 1908 Form:', value: label} ];
    } else if (this.$store.state.uploadType === "COAOP") {
      const label = this.$store.state.uploadedForms[0].name.slice(0, -6); 
      this.supportingDocuments = [ { name: 'HLTH 1926 Form:', value: label} ];
    } else if (this.$store.state.uploadType === "OOPA") {
      const label = this.$store.state.uploadedForms[0].name.slice(0, -6);
      this.supportingDocuments = [ { name: 'HLTH 2999 Form:', value: label } ];
    }

    if (this.$store.state.uploadedCredentials && this.$store.state.uploadedCredentials.length > 0) {
      const label = this.$store.state.uploadedCredentials[0].name.slice(0, -6);
      const credentials = [ { name: "Credentials Document:", value: label } ];
      this.supportingDocuments = [...this.supportingDocuments, ...credentials];
    }
  },
  methods: {
    newForm() {
      this.$store.dispatch(SET_UPLOAD_TYPE, '');
      this.$store.dispatch(SET_CREDENTIALS_REQUIRED, '');
      this.$store.dispatch(SET_SUBMISSION_TYPE, '');
      this.$store.dispatch(SET_PRIMARY_NUMBER, '');
      this.$store.dispatch(SET_PRIMARY_LAST_NAME, '');
      this.$store.dispatch(SET_SECONDARY_NUMBER, '');
      this.$store.dispatch(SET_SECONDARY_LAST_NAME, '');
      this.$store.dispatch(SET_COMMENTS, '');
      this.$store.dispatch(SET_UPLOADED_FORMS, []);
      this.$store.dispatch(SET_UPLOADED_CREDENTIALS, []);
      pageStateService.setPageIncomplete(routes.CONFIRMATION.path);
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

.buttons {
  float: right;
}

.print-button {
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
    text-align: right;
    padding-right: 8px;
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
