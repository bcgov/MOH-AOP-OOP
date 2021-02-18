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
        <a class="edit-link" href="javascript:void(0)" @click="navigateToSubmissionInfoPage()"
          >Edit <i class="fa fa-pencil"></i></a
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
    </div>
    <Table :elements="submitterData" />

    <div class="row mt-5">
      <div class="col-10">
        <h2>Submission Information</h2>
        <hr />
      </div>
    </div>
    <div class="submission-type">
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

    <div class="row mt-5">
      <div class="col-10">
        <h2>Supporting Documents</h2>
        <hr />
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
      { name: "First Name:", value: this.$store.state.firstName },
      { name: "Last Name:", value: this.$store.state.lastName },
      { name: "Email Address:", value: this.$store.state.emailAddress },
      { name: "Phone Number:", value: this.$store.state.phoneNumber }
    ];

    if (this.$store.state.facility) {
      this.submitterData = [...this.submitterData, { name: "Facility Name:", value: this.$store.state.facility }]
    }

    if (this.$store.state.organization) {
      this.submitterData = [...this.submitterData, { name: "Organization:", value: this.$store.state.organization }]
    }

    this.submissionData = [
      { name: "Primary Practitioner Number:", value: this.$store.state.primaryNumber },
      { name: "Primary Practitioner Last Name:", value: this.$store.state.primaryLastName }
    ];

    if (this.$store.state.secondaryNumber) {
      this.submissionData = [
        ...this.submissionData, 
        { name: 'Secondary Practitioner Number:', value: this.$store.state.secondaryNumber },
        { name: 'Secondary Practitioner Last Name:', value: this.$store.state.secondaryLastName }
      ]
    }

    if (this.$store.state.comments) {
      this.submissionData = [
        ...this.submissionData, 
        { name: 'Comments:', value: this.$store.state.comments }
      ]
    }

    if (this.$store.state.uploadType === "AOP") {
      this.supportingDocuments = this.$store.state.uploadedForms.map(
        (item, i) => {
          return { name: `AOP Form - ${i + 1}:`, value: item.name };
        }
      );
    } else if (this.$store.state.uploadType === "COAOP") {
      this.supportingDocuments = this.$store.state.uploadedForms.map(
        (item, i) => {
          return { name: `CAOP Form - ${i + 1}:`, value: item.name };
        }
      );
    } else if (this.$store.state.uploadType === "OOPA") {
      this.supportingDocuments = this.$store.state.uploadedForms.map(
        (item, i) => {
          return { name: `OOPA Form - ${i + 1}:`, value: item.name };
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
      (to.path === routes.SIGN_IN.path &&
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
<style lang="scss" scoped>
.selected-form {
  font-weight: bold;
  background-color: #eee;
  padding: 8px;
}

.mb {
  margin-bottom: 80px;
}

.edit-link {
  text-decoration: none;
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
