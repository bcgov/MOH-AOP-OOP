<template>
  <div>
    <h1>Sign In</h1>
    <div class="card">
      <h3>
        Sign in with a BC Services Card enabled Diagnostic Facilities Services
        User ID
      </h3>
      <Button
        label="Log in with a BC Services Card"
        styling="bcgov-normal-blue btn mb-5"
        v-on:button-click="nextPage"
      />
    </div>

    <ConsentModal
      v-if="!$store.state.hasAcceptedTerms"
      v-on:accept="acceptConsentModal"
      :heading="'Information Collection Notice'"
    />
  </div>
</template>

<script>
import Button from "vue-shared-components/src/components/button/Button";
import ConsentModal from "../components/ConsentModal";
import pageStateService from "../services/page-state-service";
import routes from "../router/routes";
import { scrollTo } from "../helpers/scroll";
import { SET_HAS_ACCEPTED_TERMS } from "../store/index";

export default {
  name: "SignIn",
  components: {
    Button,
    ConsentModal
  },
  created() {
    pageStateService.setPageComplete(routes.SIGN_IN.path);
  },
  methods: {
    nextPage() {
      pageStateService.setPageIncomplete(routes.SIGN_IN.path);
      const path = routes.SUBMISSION_INFO.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    },
    acceptConsentModal() {
      this.$store.dispatch(SET_HAS_ACCEPTED_TERMS, true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  border-radius: 5px;
  border: 1px solid #444;
}

.card h3 {
  background-color: #ddd;
  border-bottom: 1px solid #444;
  padding: 8px 16px;
  border-radius: 5px 5px 0 0;
}

.card .btn {
  margin: 8px;
}
</style>
