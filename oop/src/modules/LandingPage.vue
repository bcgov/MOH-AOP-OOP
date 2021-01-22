<template>
  <main>
    <Header name="Landing Page" :history="history" />
    <div class="container py-5">
      <a href="/msp/enrolment">Enrolment</a>
    </div>
    <Footer />
  </main>
</template>

<script>
import Footer from 'vue-shared-components/src/components/footer/Footer';
import Header from 'vue-shared-components/src/components/header/Header';

export default {
  name: 'LandingPage',
  components: {
    Footer,
    Header,
  },
  data: () => {
    return {
      history: {},
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  padding: 0;
}
</style>
