<template>
  <main>
    <Header name="Enrolment" :history="history" />
    <div class="container py-5">
      <h1>Submission successful.</h1>
      <p>Reference number: 12345</p>
      <p>IP address: {{ipAddress}}</p>
    </div>
    <Footer />
  </main>
</template>

<script>
import Footer from 'vue-shared-components/src/components/footer/Footer';
import Header from 'vue-shared-components/src/components/header/Header';
import strings from '../../../locale/strings.en';

export default {
  name: 'Submission',
  components: {
    Footer,
    Header,
  },
  data: () => {
    return {
      hasConfirmedPageLeave: false,
      history: {},
      ipAddress: null,
    };
  },
  created() {
    this.ipAddress = this.$store.state.apiResponse ? this.$store.state.apiResponse.data.ip : ''
  },
  beforeRouteLeave(to, from, next) {
    // Check for `hasConfirmedPageLeave` because of double navigation to home page.
    if (this.hasConfirmedPageLeave || window.confirm(strings.NAVIGATION_CONFIRMATION_PROMPT)) {
      this.hasConfirmedPageLeave = true;
      next();
    } else {
      next(false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  padding: 0;
}
</style>
