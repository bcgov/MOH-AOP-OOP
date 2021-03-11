<template>
  <div>
    <SignOutHeader
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
import SignOutHeader from "../components/SignOutHeader";
import ProgressBar from "../components/ProgressBar";
import { stepRoutes } from "../router/routes";
import TimeoutModal from "../components/TimeoutModal";

export default {
  name: "AssignmentOfPayment",
  components: {
    Footer,
    SignOutHeader,
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
