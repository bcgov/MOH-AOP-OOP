<template>
  <div>
    <Header :heading="'Diagnostic Services - Secure Upload Tool'" />
    <main class="container py-5 px-2">
      <h1>Under maintenance</h1>
      <p>
        This application is currently down for maintenance. Please try again in
        a few hours.
      </p>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import FocusHeaderMixin from "../mixins/FocusHeaderMixin";

export default {
  name: "Maintenance",
  components: {
    Footer,
    Header,
  },
  mixins: [FocusHeaderMixin],
};
</script>

<style lang="scss" scoped>
main.container {
  min-height: calc(100vh - 130px);
}
</style>
