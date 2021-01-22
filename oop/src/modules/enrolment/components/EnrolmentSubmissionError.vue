<template>
  <main>
    <Header name="Enrolment" :history="history" />
    <div class="container py-5">
      <h1>Submission Error.</h1>
      <p>See console for details.</p>
    </div>
    <Footer />
  </main>
</template>

<script>
import Footer from 'vue-shared-components/src/components/footer/Footer';
import Header from 'vue-shared-components/src/components/header/Header';

export default {
  name: 'EnrolmentSubmission',
  components: {
    Footer,
    Header,
  },
  data: () => {
    return {
      history: {},
    };
  },
  created: () => {
    console.log('Error: ', this.$store.state.enrolment.apiError);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  padding: 0;
}
</style>
