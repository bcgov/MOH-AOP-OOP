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
  </div>
</template>

<script>
import Button from "../components/Button";
import pageStateService from "../services/page-state-service";
import routes from "../router/routes";
import { scrollTo } from "../helpers/scroll";

export default {
  name: "SignIn",
  components: {
    Button
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
