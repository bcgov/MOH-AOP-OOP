<template>
  <div>
    <div class="buttons">
      <button class="print-button" v-on:click="print()">
        <span>Print or Save as PDF</span>
      </button>
      <i class="fas fa-info-circle"><div class="tip">To save as PDF, in the print window, click "Save as PDF"</div></i>
    </div>
    <h1>Confirmation Message</h1>
    <hr />
    <div class="success-box container">
      <div class="row">
        <div class="col-2 icon-container">
          <i class="fas fa-4x fa-check-circle"></i>
        </div>

        <div class="col-10">
          <p>Your {{ selectedForm }} form {{ withCredentials }} has been successfully submitted</p>
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
      <li>All Assignments of Payment must be processed within 90 days of the first date of service indicated on the AOP form in order to receive payment from the Medical Services Plan.</li>
      <li>It is recommended that AOP forms are submitted within 60 days of first date of service.</li>
      <li>Health Insurance BC (HIBC) will provide email confirmation to the submitter when full processing of an AOP form has been completed.</li>
      <li>For information on your specific AOP submission, contact HIBC:</li>
      Email: <a href="mailto:HIBC.AOP@gov.bc.ca">HIBC.AOP@gov.bc.ca</a>
      <br>
      Telephone: <strong>Dial 1-866-456-6950</strong>
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
      <li>All Operator Payment Administration must be processed within 90 days of the first date of service indicated on the OPA form in order to receive payment from the Medical Services Plan.</li>
      <li>It is recommended that OPA forms are submitted within 60 days of first date of service.</li>
      <li>Health Insurance BC (HIBC) will provide email confirmation to the submitter when full processing of an OPA form has been completed.</li>
      <li>For information on your specific OPA submission, contact HIBC:</li>
      Email: <a href="mailto:HIBC.AOP@gov.bc.ca">HIBC.AOP@gov.bc.ca</a>
      <br>
      Telephone: <strong>Dial 1-866-456-6950</strong>
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
import { routes } from "../router/routes";
import { scrollTo } from "../helpers/scroll";
import { NEW_FORM } from '../store/index';
import SummaryMixin from "../mixins/SummaryMixin";

export default {
  name: "Confirmation",
  mixins: [SummaryMixin],
  components: {
    Button,
    Table
  },
  data: () => {
    return {
      date: "",
      referenceNumber: "",
      withCredentials: "",
    };
  },
  created() {
    this.withCredentials = this.$store.state.credentialsRequired === "true" ? "with Credentials" : "";
    this.referenceNumber = this.$store.state.apiResponse;

    const date = new Date();
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthList[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    this.date = `${month} ${day}, ${year}`
  },
  methods: {
    newForm() {
      this.$store.dispatch(NEW_FORM);
      const path = routes.SUBMISSION_INFO.path;
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
  display: flex;
  align-items: center;
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

.radio-group {
  display: flex;
  align-items: center;
  * {
    margin-right: 6px;
  }
}

.fa-info-circle {
  position: relative;
  display: inline-block;
  color: black;
  font-size: 1.5rem;
}

/* Tooltip text */
.fa-info-circle .tip {
  visibility: hidden;
  width: 220px;
  background-color: #fff;
  color: #000;
  text-align: center;
  padding: 2px 4px;
  border-radius: 6px;
  border: 2px solid #000;
  font-weight: normal;
  font-size: 16px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.fa-info-circle:hover .tip {
  visibility: visible;
}
</style>
