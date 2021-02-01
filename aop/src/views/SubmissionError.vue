<template>
  <main>
    <Header :heading="'Enrolment'" />
    <div class="container py-5">
      <h1>Submission Error.</h1>
      <p>See console for details.</p>
    </div>
    <Footer />
  </main>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";

export default {
  name: "SubmissionError",
  components: {
    Footer,
    Header
  },
  data: () => {
    return {
      history: {}
    };
  },
  created() {
    console.log("Error: ", this.$store.state.apiError);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  padding: 0;
}
</style>
