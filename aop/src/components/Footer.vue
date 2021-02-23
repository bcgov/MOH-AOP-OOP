<template>
  <footer class="footer">
    <div class="navbar navbar-expand-sm navbar-dark"
         aria-label="Footer">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#footerBar"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse flex-grow-0" id="footerBar">
        <ul class="navbar-nav">
          <link-element url="https://www2.gov.bc.ca" label="BC Government" />
          <link-element url="https://www2.gov.bc.ca/gov/content/home/disclaimer" label="Disclaimer" />
          <link-element url="https://www2.gov.bc.ca/gov/content/home/privacy" label="Privacy" />
          <link-element url="https://www2.gov.bc.ca/gov/content/home/accessibility" label="Accessibility" />
          <link-element url="https://www2.gov.bc.ca/gov/content/home/copyright" label="Copyright" />
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
  import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
  import LinkElement from "./LinkElement.vue";
  export default {
    name: "Footer",
    components: {
      "link-element": LinkElement,
    }
  }
</script>

<style>

footer .navbar { 
  background-color: #036;
  border-top: 2px solid #fcba19;
}

</style>
