<template>
  <header>
    <div
      class="container-fluid navbar navbar-expand-lg navbar-dark"
      aria-label="Header"
    >
      <div classNames="navbar-brand pointer" aria-labelledby="title" />
      <a href="http://www2.gov.bc.ca/" tabindex="0">
        <img
          alt="BC Logo"
          classNames="img-fluid d-none d-md-block pointer"
          :width="181"
          :src="bcidLogoRev"
        />
      </a>
      <div id="title" class="navbar-brand">
        {{ heading }}
      </div>
      <button class="sign-out" @click="endSession">
        <span>Sign out</span>
        <i class="fas fa-sign-out-alt fa-2x"></i>
      </button>
    </div>
  </header>
</template>

<script>
import { routes } from "../router/routes";
import { scrollTo } from "../helpers/scroll";

export default {
  name: "SignOutHeader",
  props: {
    heading: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      bcidSymbol: "/images/bcid-symbol-rev.svg",
      bcidLogoRev: "/images/bcid-logo-rev-en.svg"
    };
  },
  methods: {
    endSession() {
      this.$store.dispatch('resetForm');
      const path = routes.SESSION_END.path;
      this.$router.push(path);
      scrollTo(0);
    },
  }
};
</script>

<style scoped>
header .navbar {
  background-color: #036;
  border-bottom: 2px solid #fcba19;
}

.navbar > .container-fluid {
  width: 95%;
  justify-content: inherit;
}

#title {
  white-space: normal;
}

.pointer {
  cursor: pointer;
}

.sign-out {
  background-color: transparent;
  border: none;
  width: 20%;
  color: white;
  display: flex;
  justify-content: center;
}

.sign-out span {
  padding-right: 8px;
}
</style>
