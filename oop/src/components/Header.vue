<template>
  <header>
    <nav class="container-fluid navbar navbar-expand-lg navbar-dark" aria-label="Header">
      <img
        class="img-fluid d-none d-md-block pointer"
        :src="bcidLogoRev"
        width="181"
        height="44"
        alt="B.C. Government Logo"
        role="img"
      />
      <img
        class="img-fluid d-md-none pointer"
        :src="bcidSymbol"
        width="64"
        height="44"
        alt="B.C. Government Logo"
        role="img"
      />
      <div id="title" class="navbar-brand">
        {{ title }}
      </div>
    </nav>
  </header>
</template>

<script>
  import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

  export default {
    name: "Header",
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        bcidSymbol: `/images/bcid-symbol-rev.svg`,
        bcidLogoRev: `/images/bcid-logo-rev-en.svg`,
      }
    }
  }
</script>

<style scoped>
.navbar > .container-fluid {
  width: 95%;
  justify-content: inherit;
}

.pointer {
  cursor: pointer;
}
</style>