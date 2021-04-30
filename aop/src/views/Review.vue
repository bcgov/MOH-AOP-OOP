<template>
  <div>
    <SignOutHeader :heading="'Diagnostic Services - Secure Upload Tool'" />
    <ProgressBar :routes="stepRoutes" :currentPath="$route.path" />
    <main>
      <div class="container py-5 px-2">
        <h1>Review your submission</h1>
        <hr />

        <div class="relative">
            <h2>Selected form</h2>
            <hr />
            <a class="edit-link" href="javascript:void(0)" @click="navigateToSubmissionInfoPage()"
              >Edit <font-awesome-icon icon="pencil-alt" /></a
            >
        </div>
        <div class="selected-form mb-4">
          {{ selectedForm }} {{ withCredentials }}
        </div>

        <h2 class="mt-4">Submitter information</h2>
        <hr />
        <Table :elements="submitterData" />

        <h2 class="mt-4">Information about this submission</h2>
        <hr />
        <div v-if="$store.state.uploadType !== 'COAOP'" class="submission-type">
          <div class="name">
            <div>
              Submission Type:
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
                <label for="new"><strong>New submission</strong></label>
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
              <label for="revised"><strong>Revised submission</strong></label>
            </div>
          </div>
        </div>
        <Table :elements="submissionData" />

        <h2 class="mt-4">Supporting documents</h2>
        <hr />
        <Table :elements="supportingDocuments" />
      </div>
      <ContinueBar @continue='nextPage()' :buttonLabel="'Submit'" />
    </main>
    <Footer />
  </div>
</template>

<script>
import SignOutHeader from "../components/SignOutHeader";
import ProgressBar from "../components/ProgressBar";
import ContinueBar from "../components/ContinueBar";
import Footer from "../components/Footer";
import Table from "../components/Table";
import { scrollTo } from "../helpers/scroll";
import SummaryMixin from '../mixins/SummaryMixin';
import FocusHeaderMixin from '../mixins/FocusHeaderMixin';
import { routes, stepRoutes } from "../router/routes";
import NoNameLogoutMixin from '../mixins/NoNameLogoutMixin';

export default {
  name: "Review",
  components: {
    SignOutHeader,
    ProgressBar,
    ContinueBar,
    Table,
    Footer
  },
  mixins: [SummaryMixin, FocusHeaderMixin, NoNameLogoutMixin],
  data: () => {
    return {
      stepRoutes: stepRoutes,
      withCredentials: ''
    }
  },
  created() {
    this.withCredentials = this.$store.state.credentialsRequired === "true" ? "with credentials" : "";
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
