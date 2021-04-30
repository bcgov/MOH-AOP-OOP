<template>
  <div>
    <Header :heading="'Diagnostic Services - Secure Upload Tool'" />
    <main class="container py-5 px-2">
      <h1 class="text-center">Sending application</h1>
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
import { routes } from "../router/routes";
import { submitApplication } from "../services/submission-service";
import { log } from "../services/logging-service";
import { SET_API_RESPONSE, SET_UUID } from '../store';
import FocusHeaderMixin from '../mixins/FocusHeaderMixin';
import NoNameLogoutMixin from '../mixins/NoNameLogoutMixin';
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Sending",
  components: {
    Footer,
    Header,
  },
  mixins: [FocusHeaderMixin, NoNameLogoutMixin],
  data: () => {
    return {
      hasConfirmedPageLeave: false,
    };
  },
  created() {
    submitApplication(this.$store.state)
      .then(res => {
        if (res.data && res.data.returnCode === "success") {
          this.$store.commit(SET_API_RESPONSE, res.data.refNumber);
          log({message: 'Success', error: null}, res.data.uuid, res.data.refNumber);
          this.nextPage();
        } else if (res.data && res.data.returnCode === "failure"){
          if (res.data.dberrorMessage) {
            log({message: 'Error storing application in db', error: res.data.dberrorMessage}, res.data.uuid);
          } else {
            log({message: 'Error validating application', error: res.data.validationError}, res.data.uuid);
          }
          this.navigateToErrorPage();
        } else {
          log({message: 'Error sending application', error: 'Unknown error'});
          this.navigateToErrorPage();
        }
      })
      .catch(err => {
        log({message: 'Error sending application', error: err});
        this.navigateToErrorPage();
      })
      .finally(() => {
        // Create a new UUID for further submissions
        this.$store.commit(SET_UUID, uuidv4());
      });
  },
  methods: {
    nextPage() {
      const path = routes.CONFIRMATION.path;
      this.$router.push(path);
    },
    navigateToErrorPage() {
      const path = routes.SUBMISSION_ERROR.path;
      this.$router.push(path);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main.container {
  min-height: calc(100vh - 129px);
}

/* Spinner from a resource */
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
  border: 8px solid #bbb;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #bbb transparent transparent transparent;
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
