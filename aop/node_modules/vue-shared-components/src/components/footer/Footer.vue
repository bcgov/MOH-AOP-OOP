<template>
  <footer class="footer">
    <nav class="navbar navbar-expand-sm navbar-dark justify-content-end"
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
        <ul class="navbar-nav text-right">
          <link-element url="https://www2.gov.bc.ca" label="BC Government" />
          <link-element url="https://www2.gov.bc.ca/gov/content/home/disclaimer" label="Disclaimer" />
          <link-element url="https://www2.gov.bc.ca/gov/content/home/privacy" label="Privacy" />
          <link-element url="https://www2.gov.bc.ca/gov/content/home/accessibility" label="Accessibility" />
          <link-element url="https://www2.gov.bc.ca/gov/content/home/copyright" label="Copyright" />
        </ul>
      </div>
    </nav>
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
