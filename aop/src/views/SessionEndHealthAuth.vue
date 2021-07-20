<template>
  <div>
    <Header :heading="'Diagnostic Services - Secure Upload Tool'" />
    <main class="container py-5 px-2">
      <h1>Secure session ended</h1>
      <p>
        You have successfully closed your secure session with the Diagnostic
        Facilities upload tool.
      </p>
      <p>You may close your browser now.</p>
    </main>
    <ContinueBar
      :buttonLabel="'Start again'"
      @continue="navigateToSubmissionInfo"
    />
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import ContinueBar from "../components/ContinueBar";
import { HealthAuthRoutes } from "../router/routes";
import { scrollTo } from "../helpers/scroll";
import FocusHeaderMixin from "../mixins/FocusHeaderMixin";

export default {
  name: "SessionEnd",
  components: {
    Footer,
    Header,
    ContinueBar,
  },
  mixins: [FocusHeaderMixin],
  data: () => {
    return {};
  },
  methods: {
    navigateToSubmissionInfo() {
      const path = HealthAuthRoutes.SUBMISSION_INFO.path;
      this.$router.push(path);
      scrollTo(0);
    },
  },
};
</script>

<style lang="scss" scoped>
main.container {
  min-height: calc(100vh - 203px);
}
</style>
