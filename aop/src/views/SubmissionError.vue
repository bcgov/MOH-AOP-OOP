<template>
  <div>
    <Header :heading="'Diagnostic Services - Secure Upload Tool'" />
    <main class="container py-5 px-2">
      <h1>Submission Error</h1>
      <div class="success-box container">
        <div class="row">
          <div class="col-2 icon-container">
            <i class="far fa-4x fa-times-circle"></i>
          </div>

          <div class="col-10">
            <p>Something went wrong:</p>
            <p>{{ message }}</p>
          </div>
        </div>
      </div>
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
import { routes } from "../router/routes";
import { scrollTo } from "../helpers/scroll";

export default {
  name: "SessionEnd",
  components: {
    Footer,
    Header,
    Button
  },
  data: () => {
    return {
      message: ''
    };
  },
  created(){
    this.message = this.$store.state.apiResponse.toString();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fa-times-circle {
  color: #b33238;
}

.success-box {
  border-radius: 10px;
  border: 5px solid #b33238;
  padding: 10px;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
