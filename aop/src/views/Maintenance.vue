<template>
  <div>
    <Header :heading="'Diagnostic Services - Secure Upload Tool'" />
    <main class="container py-5 px-2">
      <h1>Maintenance mode</h1>
      <hr />
      <p>{{ maintenanceMessage }}</p>
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
  data: () => {
    return {
      maintenanceMessage:
        "This application is currently unavailable due to maintenance. Please try again later.",
    };
  },
  created() {
    this.maintenanceMessage = this.$store.state.maintenanceMessage;
  },
};
</script>

<style lang="scss" scoped>
main.container {
  min-height: calc(100vh - 130px);
}
</style>
