<template>
  <div>
    <h1>Review Your Submission</h1>
    <hr />

    <div class="row mt-5">
      <div class="col-10">
        <h2>Selected Form</h2>
        <hr />
      </div>
      <div class="col-2 text-right">
        <a href="javascript:void(0)" @click="navigateToSubmissionInfoPage()"
          >Edit</a
        >
      </div>
    </div>
    <div class="selected-form">
      {{ selectedForm }}
    </div>

    <div class="row mt-5">
      <div class="col-10">
        <h2>Submitter Information</h2>
        <hr />
      </div>
      <div class="col-2 text-right">
        <a href="javascript:void(0)" @click="navigateToSubmissionInfoPage()"
          >Edit</a
        >
      </div>
    </div>
    <Table :elements="submitterData" />

    <div class="row mt-5">
      <div class="col-10">
        <h2>Submission Information</h2>
        <hr />
      </div>
      <div class="col-2 text-right">
        <a href="javascript:void(0)" @click="navigateToSubmissionInfoPage()"
          >Edit</a
        >
      </div>
    </div>
    <Table :elements="submissionData" />

    <div class="row mt-5">
      <div class="col-10">
        <h2>Supporting Documents</h2>
        <hr />
      </div>
      <div class="col-2 text-right">
        <a href="javascript:void(0)" @click="navigateToSubmissionInfoPage()"
          >Edit</a
        >
      </div>
    </div>
    <Table :elements="supportingDocuments" />

    <Button
      label="Submit"
      styling="bcgov-normal-blue btn mb"
      v-on:button-click="nextPage"
    />
  </div>
</template>

<script>
import Button from "../components/Button";
import Table from "../components/Table";
import routes from "../router/routes";
import pageStateService from "../services/page-state-service";
import strings from "../locale/strings.en";
import { scrollTo } from "../helpers/scroll";

export default {
  name: "Review",
  components: {
    Button,
    Table
  },
  data: () => {
    return {
      selectedForm: "",
      submitterData: [],
      submissionData: [],
      supportingDocuments: []
    };
  },
  created() {
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

    this.submitterData = [
      { name: "First Name", value: this.$store.state.firstName },
      { name: "Last Name", value: this.$store.state.lastName },
      { name: "Email Address", value: this.$store.state.emailAddress },
      { name: "Phone Number", value: this.$store.state.phoneNumber },
      { name: "Facility Name:", value: this.$store.state.facility || "N/A" },
      { name: "Organization:", value: this.$store.state.organization || "N/A" }
    ];

    this.submissionData = [
      { name: "Submission Type", value: this.$store.state.submissionType },
      {
        name: "Primary Practitioner Number",
        value: this.$store.state.primaryNumber
      },
      {
        name: "Primary Practitioner Last Name",
        value: this.$store.state.primaryLastName
      },
      {
        name: "Secondary Practitioner Number",
        value: this.$store.state.secondaryNumber || "N/A"
      },
      {
        name: "Secondary Practitioner Last Name",
        value: this.$store.state.secondaryLastName || "N/A"
      },
      { name: "Comments", value: this.$store.state.comments || "N/A" }
    ];

    if (this.$store.state.uploadType === "AOP") {
      this.supportingDocuments = this.$store.state.uploadedForms.map(
        (item, i) => {
          return { name: `AOP Form - ${i + 1}`, value: item.name };
        }
      );
    } else if (this.$store.state.uploadType === "COAOP") {
      this.supportingDocuments = this.$store.state.uploadedForms.map(
        (item, i) => {
          return { name: `CAOP Form - ${i + 1}`, value: item.name };
        }
      );
    } else if (this.$store.state.uploadType === "OOPA") {
      this.supportingDocuments = this.$store.state.uploadedForms.map(
        (item, i) => {
          return { name: `OOPA Form - ${i + 1}`, value: item.name };
        }
      );
    }

    if (this.$store.state.uploadedCredentials.length > 0) {
      const credentials = this.$store.state.uploadedCredentials.map(
        (item, i) => {
          return { name: `Credentials - ${i + 1}`, value: item.name };
        }
      );
      this.supportingDocuments = [...this.supportingDocuments, ...credentials];
    }
  },
  methods: {
    nextPage: function() {
      pageStateService.setPageIncomplete(routes.REVIEW.path);
      const path = routes.SENDING.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
    },
    navigateToHomePage() {
      pageStateService.setPageIncomplete(routes.REVIEW.path);
      const path = routes.HOME.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    },
    navigateToSubmissionInfoPage() {
      pageStateService.setPageIncomplete(routes.REVIEW.path);
      const path = routes.SUBMISSION_INFO.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.path === routes.SENDING.path ||
      (to.path === routes.HOME.path &&
        pageStateService.isPageComplete(to.path)) ||
      (to.path === routes.SUBMISSION_INFO.path &&
        pageStateService.isPageComplete(to.path))
    ) {
      next();
    } else {
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selected-form {
  font-weight: bold;
  background-color: #eee;
  padding: 8px;
}

.mb {
  margin-bottom: 80px;
}
</style>
