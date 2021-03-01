<template>
  <div>
    <Header
      :heading="
        'Upload Tool for: Diagnostic Facility Services Assignment of Payment & Medical Director Authorization, Laboratory Services Outpatient Operator Payment Administration and related forms'
      "
    />
    <main class="container py-5 px-2">
      <h1>Secure session ended</h1>
      <p>You have successfully closed your secure session with the Diagnostic Facility Upload Tool.</p>
      <p>You may close your browser now.</p>
      <Button
        label="Back to Sign In"
        styling="bcgov-normal-blue btn bottom mb"
        v-on:button-click="navigateToSignIn"
      />
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import routes from "../router/routes";
import pageStateService from "../services/page-state-service";
import { scrollTo } from "../helpers/scroll";

export default {
  name: "SessionEnd",
  components: {
    Footer,
    Header,
    Button
  },
  data: () => {
    return {};
  },
  methods: {
    navigateToSignIn() {
      pageStateService.setPageIncomplete(routes.SESSION_END.path);
      const path = routes.SIGN_IN.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
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
  bottom: 0;
  width: 100vw;
}

.bottom {
  position: fixed;
  right: 40px;
  bottom: 0;
}

.mb {
  margin-bottom: 80px;
}
</style>
