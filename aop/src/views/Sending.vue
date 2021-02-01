<template>
  <main>
    <Header
      :heading="
        'Upload Tool for: Diagnostic Facility Services Assignment of Payment & Medical Director Authorization, Laboratory Services Outpatient Operator Payment Administration and related forms'
      "
    />
    <div class="container py-5">
      <h1 class="text-center">Sending Application</h1>
      <div class="text-center">
        <div class="bcgov-page-loader"></div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<script>
import Footer from "vue-shared-components/src/components/footer/Footer";
import Header from "../components/Header";
import routes from "../router/routes";
import pageStateService from "../services/page-state-service";
import { SET_API_RESPONSE, SET_API_ERROR } from "../store/index";
import strings from "../locale/strings.en";

export default {
  name: "Sending",
  components: {
    Footer,
    Header
  },
  data: () => {
    return {
      hasConfirmedPageLeave: false
    };
  },
  created: function() {
    const testSuccess = true;

    if (testSuccess === true) {
      setTimeout(() => {
        this.$store.dispatch(SET_API_RESPONSE, { message: "API Message" });
        this.nextPage();
      }, 2000);
    } else {
      setTimeout(() => {
        this.$store.dispatch(SET_API_ERROR, "Error message placeholder");
        this.navigateToErrorPage();
      }, 2000);
    }
  },
  methods: {
    nextPage: function() {
      pageStateService.setPageIncomplete(routes.SENDING.path);
      const path = routes.SUBMISSION.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
    },
    navigateToErrorPage: function() {
      pageStateService.setPageIncomplete(routes.SENDING.path);
      const path = routes.SUBMISSION_ERROR.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.path === routes.SUBMISSION.path ||
      to.path === routes.SUBMISSION_ERROR.path
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
main {
  padding: 0;
}

.footer {
  position: fixed;
  width: 100vw;
  bottom: 0;
}
</style>
