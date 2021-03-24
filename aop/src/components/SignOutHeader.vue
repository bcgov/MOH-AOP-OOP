<template>
  <header>
    <div
      class="container navbar navbar-dark"
      aria-label="Header"
    >
      <div class="logo-and-title">
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
      </div>
      <button class="sign-out" @click="showModal">
        <span>Sign out</span>
        <font-awesome-icon icon="sign-out-alt" />
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
    showModal() {
      this.$store.dispatch("showSignOutModal");
    }
  }
};
</script>

<style scoped>
header {
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
  align-items: center;
  padding: 12px 0;
}

.sign-out span {
  padding-right: 8px;
  min-width: 71px;
}

.fa-sign-out-alt {
  font-size: 1.5rem;
}

@media (max-width: 992px) {
  .sign-out {
    justify-content: start;
  }
}
</style>
