<template>
  <div>
    <Header
      :heading="
        'Upload Tool for: Diagnostic Facility Services Assignment of Payment & Medical Director Authorization, Laboratory Services Outpatient Operator Payment Administration and related forms'
      "
    />
    <ProgressBar :routes="stepRoutes" :currentPath="$route.path" />
    <main class="container py-5 px-2">
      <router-view></router-view>
    </main>
    <Footer />
    <TimeoutModal v-if="showModal"
            v-on:close="handleModalClose"/>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import stepRoutes from "../router/step-routes";
import TimeoutModal from "../components/TimeoutModal";

export default {
  name: "AssignmentOfPayment",
  components: {
    Footer,
    Header,
    ProgressBar,
    TimeoutModal
  },
  data: () => {
    return {
      stepRoutes: stepRoutes,
      showModal: false
    };
  },
  onIdle() {
    this.showModal = true;
  },
  methods: {
    handleModalClose() {
      this.showModal = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  padding: 0;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
}
</style>
