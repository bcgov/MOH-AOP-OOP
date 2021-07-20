<template>
  <div>
    <router-view></router-view>
    <TimeoutModal v-if="showTimeout" v-on:close="handleModalClose"/>
  </div>
</template>

<script>
import TimeoutModal from "../components/TimeoutModal";

export default {
  name: "AssignmentOfPayment",
  components: {
    TimeoutModal,
  },
  data: () => {
    return {
      showTimeout: false,
    };
  },
  onIdle() {
    this.showTimeout = true;
  },
  methods: {
    handleModalClose() {
      this.showTimeout = false;
    }
  }
};
</script>
