<template>
  <div>
    <h1>Review Your Submission</h1>
    <hr />

    <div class="relative">
        <h2>Selected Form</h2>
        <hr />
        <a class="edit-link" href="javascript:void(0)" @click="navigateToSubmissionInfoPage()"
          >Edit <i class="fa fa-pencil"></i></a
        >
    </div>
    <div class="selected-form mb-4">
      {{ selectedForm }}
    </div>

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

.relative {
  position: relative;

  .edit-link {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
