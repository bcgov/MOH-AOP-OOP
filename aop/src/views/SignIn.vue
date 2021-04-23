<template>
  <div>
    <Header :heading="'Diagnostic Services - Secure Upload Tool'" />
    <ProgressBar :routes="stepRoutes" :currentPath="$route.path" />
    <main class="container py-5 px-2">
      <h1>Ministry of Health - Diagnostic Services secure upload tool</h1>
      <p>This site is specifically for submitting the following forms:</p>
      <ul class="mt-3">
        <li>Diagnostic Facility Services Assignment of Payment &#38; Medical Director Authorization (HLTH 1908)</li>
        <li>Diagnostic Facility Services Cancellation of Assignment of Payment (HLTH 1926)</li>
        <li>Laboratory Services Outpatient Operator Payment Administration (HLTH 2999)</li>
      </ul>
      <strong>Please sign in as a first step to uploading one or more of these forms.</strong>
      <hr>
      <div class="card">
        <h3>
          Sign in with a BC Services Card enabled Diagnostic Facilities Services
          user ID
        </h3>
        <Button
          label="Log in with a BC Services Card"
          styling="bcgov-normal-blue btn"
          v-on:button-click="nextPage"
        />
        <p class="mb-3">A <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card">BC Services Card</a> provides secure access to provincial government services and access to Diagnostic Facilities Services. <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/log-in-with-card/help">Learn how to use your BC Services Card to log in.</a></p>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { routes, stepRoutes } from "../router/routes";
import { scrollTo } from "../helpers/scroll";
import FocusHeaderMixin from "../mixins/FocusHeaderMixin";

export default {
  name: "SignIn",
  components: {
    Header,
    ProgressBar,
    Button,
    Footer
  },
  mixins: [FocusHeaderMixin],
  data: () => {
    return {
      stepRoutes,
      BCSC_SERVICE_URI: "https://bcsc-service-a3c641-dev.apps.silver.devops.gov.bc.ca/auth"
    }
  },
  methods: {
    nextPage() {
      const path = this.BCSC_SERVICE_URI;
      window.location.href = path;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main.container {
  min-height: calc(100vh - 129px);
}

.card {
  border-radius: 5px;
  border: 1px solid #444;
}

.card h3 {
  background-color: #ddd;
  border-bottom: 1px solid #444;
  padding: 8px 16px;
  border-radius: 5px 5px 0 0;
  color: black;
}

.card .btn {
  margin: 8px;
}

.card p {
  margin: 8px;
}

.card p a {
  text-decoration: none;
}
</style>
