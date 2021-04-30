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
            class="pointer horizontal"
            :width="181"
            :src="bcidLogoRev"
          />
          <img
            alt="BC Logo"
            class="pointer vertical pr-3"
            :width="90"
            :src="bcidLogoVert"
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
import { SHOW_SIGN_OUT_MODAL } from '../store';

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
      bcidLogoRev: "/images/bcid-logo-rev-en.svg",
      bcidLogoVert: "/images/BCID_V_rgb_rev_trimmed.png"
    };
  },
  methods: {
    showModal() {
      this.$store.dispatch(SHOW_SIGN_OUT_MODAL);
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

.logo-and-title {
  display: flex;
  align-items: center;
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

@media (max-width: 991px) {
  .sign-out {
    width: auto;
    padding-right: 12px;
    justify-content: start;
  }
}

@media (max-width: 767px) {
  .navbar {
    flex-direction: row-reverse;
  }
}

@media (min-width: 481px) {
  img.horizontal {
    display: block;
  }

  img.vertical {
    display: none;
  }
}

@media (max-width: 480px) {
  img.horizontal {
    display: none;
  }

  img.vertical {
    display: block;
  }
}
</style>
