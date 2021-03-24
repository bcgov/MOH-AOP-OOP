<template>
  <div>
    <Header :heading="'Diagnostic Services - Secure Upload Tool'" />
    <main class="container py-5 px-2">
      <h1>Secure session ended</h1>
      <p>You have successfully closed your secure session with the Diagnostic Facility Upload Tool.</p>
      <p>You may close your browser now.</p>
    </main>
    <ContinueBar :buttonLabel="'Back to Sign In'" @continue="navigateToSignIn" />
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import ContinueBar from "../components/ContinueBar";
import { routes } from "../router/routes";
import { scrollTo } from "../helpers/scroll";
import FocusHeaderMixin from "../mixins/FocusHeaderMixin";

export default {
  name: "SessionEnd",
  components: {
    Footer,
    Header,
    ContinueBar
  },
  mixins: [FocusHeaderMixin],
  data: () => {
    return {};
  },
  methods: {
    navigateToSignIn() {
      const path = routes.SIGN_IN.path;
      this.$router.push(path);
      scrollTo(0);
    }
  }
};
</script>

<style lang="scss" scoped>
main.container {
  min-height: calc(100vh - 203px);
}
</style>
