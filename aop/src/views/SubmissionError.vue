<template>
  <div>
    <SignOutHeader :heading="'Diagnostic Services - Secure Upload Tool'" />
    <main class="container py-5 px-2">
      <h1>Submission error</h1>
      <div class="success-box container">
        <div class="row">
          <div class="col-md-2 icon-container">
            <font-awesome-icon icon="times-circle" size="4x" />
          </div>

          <div class="col-md-10">
            <p class="py-3">
              An error has occured with your submission. Please close this form
              and wait a few minutes before trying again. If the error persists,
              please contact
              <a
                class="HIBC-link"
                href="https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/msp/contact-us"
                >Health Insurance BC</a
              >.
            </p>
          </div>
        </div>
      </div>
    </main>
    <ContinueBar
      :buttonLabel="'Back to form select'"
      @continue="navigateToFormSelect"
    />
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import SignOutHeader from "../components/SignOutHeader";
import ContinueBar from "../components/ContinueBar";
import { routes } from "../router/routes";
import { scrollTo } from "../helpers/scroll";
import FocusHeaderMixin from "../mixins/FocusHeaderMixin";

export default {
  name: "SessionEnd",
  components: {
    Footer,
    SignOutHeader,
    ContinueBar,
  },
  mixins: [FocusHeaderMixin],
  data: () => {
    return {
      message: "",
    };
  },
  created() {
    this.message = this.$store.state.apiResponse.toString();
  },
  methods: {
    navigateToFormSelect() {
      const path = routes.SUBMISSION_INFO.path;
      this.$router.push(path);
      scrollTo(0);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main.container {
  min-height: calc(100vh - 203px);
}

.fa-times-circle {
  color: #d8292f;
}

.success-box {
  border-radius: 10px;
  border: 5px solid #d8292f;
  padding: 10px;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.HIBC-link {
  text-decoration: none;
}
</style>
