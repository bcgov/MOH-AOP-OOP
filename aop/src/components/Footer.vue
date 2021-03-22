<template>
  <footer class="footer">
    <div class="navbar navbar-dark" aria-label="Footer">
        <ul class="navbar-nav">
          <link-element url="https://www2.gov.bc.ca/gov/content/home/disclaimer" label="Disclaimer" />
          <link-element url="https://www2.gov.bc.ca/gov/content/home/privacy" label="Privacy" />
          <link-element url="https://www2.gov.bc.ca/gov/content/home/accessibility" label="Accessibility" />
          <link-element url="https://www2.gov.bc.ca/gov/content/home/copyright" label="Copyright" />
          <link-element url="https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents-contact-us" label="Contact Us" />
        </ul>
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

<style lang="scss">
footer.footer {
  position: relative;
  width: 100%;
}

footer .navbar { 
  background-color: #036;
  border-top: 2px solid #fcba19;
}

.navbar-nav {
  display: flex;
  flex-direction: row;
  
  li { 
    padding: 2px 17px;
    border-left: 1px solid #4b5e73;
  }
}

@media (max-width: 768px) {
  .navbar-nav {
    display: flex;
    flex-direction: column;
  }
}

</style>
