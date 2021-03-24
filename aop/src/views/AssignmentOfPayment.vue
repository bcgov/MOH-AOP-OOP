<template>
  <div>
    <router-view></router-view>
    <TimeoutModal v-if="showTimeout" v-on:close="handleModalClose"/>
    <SignOutModal v-if="showSignOut" v-on:close="handleModalClose"/>
  </div>
</template>

<script>
import TimeoutModal from "../components/TimeoutModal";
import SignOutModal from "../components/SignOutModal";
import { mapState } from "vuex";

export default {
  name: "AssignmentOfPayment",
  components: {
    TimeoutModal,
    SignOutModal,
  },
  data: () => {
    return {
      showTimeout: false,
      showSignOut: false,
    };
  },
  computed: mapState(['showSignOutModal']),
  watch: {
    showSignOutModal(newVal) {
      if (newVal === true) {
        this.showSignOut = true;
      }
    }
  },
  onIdle() {
    this.showTimeout = true;
  },
  methods: {
    handleModalClose() {
      this.showTimeout = false;
      this.showSignOut = false;
    }
  }
};
</script>
