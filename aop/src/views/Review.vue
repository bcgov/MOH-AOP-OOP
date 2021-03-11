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
import { routes } from "../router/routes";
import { scrollTo } from "../helpers/scroll";
import SummaryMixin from '../mixins/SummaryMixin';

export default {
  name: "Review",
  mixins: [SummaryMixin],
  components: {
    Button,
    Table
  },
  methods: {
    nextPage: function() {
      const path = routes.SENDING.path;
      this.$router.push(path);
      scrollTo(0);
    },
    navigateToSubmissionInfoPage() {
      const path = routes.SUBMISSION_INFO.path;
      this.$router.push(path);
      scrollTo(0);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.selected-form {
  font-weight: bold;
  background-color: #eee;
  padding: 8px;
}

.edit-link {
  text-decoration: none;
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
