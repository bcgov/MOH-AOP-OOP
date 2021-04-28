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
        <Loader v-if="$store.state.loading" />
        <Button
          v-else
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
import Loader from "../components/Loader";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { stepRoutes } from "../router/routes";
import FocusHeaderMixin from "../mixins/FocusHeaderMixin";
import axios from "axios";
import spaEnvService from "../services/spa-env-service";
import { SET_BCSC_SERVICE_URI, SET_LAST_NAME, SET_LOADING, SET_SECRET } from '../store';
import { SET_FIRST_NAME } from '../../../oop-backup/src/store/modules/enrolment';

export default {
  name: "SignIn",
  components: {
    Header,
    ProgressBar,
    Loader,
    Button,
    Footer
  },
  mixins: [FocusHeaderMixin],
  data: () => {
    return {
      stepRoutes,
      bcscRedirect: "",
      given_name: "",
      family_name: "",
    }
  },
  created() {
    spaEnvService.loadEnvs()
      .then(() => {
        // load env variables from spa-env-server
        if (spaEnvService.values) {
          this.$store.dispatch(SET_BCSC_SERVICE_URI, spaEnvService.values.SPA_ENV_AUTH_SERVICE_URL);
          this.$store.dispatch(SET_SALT, spaEnvService.values.SPA_ENV_AOP_SALT);
          if (spaEnvService.values.SPA_ENV_AOP_MAINTENANCE_FLAG === 'true') {
            const path = routes.MAINTENANCE_PAGE.path;
            this.$router.push(path);
          }
        } else {
          const path = routes.MAINTENANCE_PAGE.path;
          this.$router.push(path);
        }
      })
      .then(() => {
        // Handle BCSC
        const BCSC_SERVICE_URI = this.$store.state.BCSC_SERVICE_URI;
        if(!this.$route.query.code){
          // STAGE 1: get the bcsc url and show the user the signIn page
          axios.get(BCSC_SERVICE_URI + '/api/url')
            .then((res) => {
              this.bcscRedirect = res.data.url;
            })
            .catch((e) => {
              console.log("failed to retrieve bcsc url", e);
            })
        } else {
          // STAGE 2: user is authenticated get their info and load submissionInfo
          const code = this.$route.query.code;
          const state = this.$route.query.state;
          axios.get(BCSC_SERVICE_URI + `/api/auth/${code}`)
            .then((res) => {
              this.$store.dispatch(SET_FIRST_NAME, res.data.given_name);
              this.$store.dispatch(SET_LAST_NAME, res.data.family_name);
              const path = routes.SUBMISSION_INFO.path;
              this.$router.push(path);
              scrollTo(0);
            })
            .catch((e) => {
              axios.get(BCSC_SERVICE_URI + '/api/url')
                .then((res) => {
                  this.bcscRedirect = res.data.url;
                })
                .catch((e) => {
                  console.log("failed to retrieve bcsc url", e);
                })
            })
        }
      })
      .finally(() => {
        this.$store.dispatch(SET_LOADING, false);
      })
  },
  methods: {
    nextPage() {
      //BCSC: send user for authentication when they click the button
      window.location.href = this.bcscRedirect;
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
