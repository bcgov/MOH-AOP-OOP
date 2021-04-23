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
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
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
