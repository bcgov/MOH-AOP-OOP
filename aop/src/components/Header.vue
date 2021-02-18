<template>
  <header>
    <nav
      class="container-fluid navbar navbar-expand-lg navbar-dark"
      aria-label="Header"
    >
      <div classNames="navbar-brand pointer" aria-labelledby="title" />
      <img
        alt="BC Logo"
        classNames="img-fluid d-none d-md-block pointer"
        :width="181"
        :src="bcidLogoRev"
      />
      <div id="title" class="navbar-brand">
        {{ heading }}
      </div>
    </nav>
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
      bcidLogoRev: "/images/bcid-logo-rev-en.svg"
    };
  }
};
</script>

<style scoped>
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
</style>
