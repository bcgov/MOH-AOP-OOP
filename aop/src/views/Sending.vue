<template>
  <div>
    <Header
      :heading="'Upload Tool for: Diagnostic Facility Services Assignment of Payment & Medical Director Authorization, Laboratory Services Outpatient Operator Payment Administration and related forms'"
    />
    <main class="container py-5 px-2">
      <h1 class="text-center">Sending Application</h1>
      <div class="text-center">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "../router/routes";
import pageStateService from "../services/page-state-service";
import { submitApplication } from "../services/submission-service";
import { SET_API_RESPONSE } from '../store';

export default {
  name: "Sending",
  components: {
    Footer,
    Header,
  },
  data: () => {
    return {
      hasConfirmedPageLeave: false,
    };
  },
  created() {
    submitApplication(this.$store.state)
      .then(res => {
        this.$store.dispatch(SET_API_RESPONSE, res);
        this.nextPage();
      })
      .catch(err => {
        this.$store.dispatch(SET_API_RESPONSE, err);
        this.navigateToErrorPage();
      });
  },
  methods: {
    nextPage() {
      pageStateService.setPageIncomplete(routes.SENDING.path);
      const path = routes.CONFIRMATION.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
    },
    navigateToErrorPage() {
      pageStateService.setPageIncomplete(routes.SENDING.path);
      const path = routes.SUBMISSION_ERROR.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
    },
  },
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

/* From a resource */
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #eee;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #eee transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
