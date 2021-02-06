<template>
  <footer class="footer">
    <nav aria-label="Footer">
      <div>
        <div class="row align-items-end m-0">
          <div class="col-1">
            <span class="text-left version">v{{version}}</span>
          </div>
          <div class="col-11 text-right">
            <ul class="footer-links">
              <li class="d-md-inline-block m-1">
                <a href="https://www2.gov.bc.ca" target="_blank">BC Government</a>
              </li>
              <li class="d-md-inline-block m-1">
                <a href="https://www2.gov.bc.ca/gov/content/home/disclaimer" target="_blank">Disclaimer</a>
              </li>
              <li class="d-md-inline-block m-1">
                <a href="https://www2.gov.bc.ca/gov/content/home/privacy" target="_blank">Privacy</a>
              </li>
              <li class="d-md-inline-block m-1">
                <a href="https://www2.gov.bc.ca/gov/content/home/accessibility" target="_blank">Accessibility</a>
              </li>
              <li class="d-md-inline-block m-1">
                <a href="https://www2.gov.bc.ca/gov/content/home/copyright" target="_blank">Copyright</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </footer>
</template>

<script>
  import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

  export default {
    name: "Footer",
    props: {
      version: String
    }
  }
</script>

<style scoped>
.footer-links {
  margin: 0;
}
.version {
  font-size: 0.75rem;
  color: white;
}
a {
  color: white;
}
ul {
  list-style: none;
}
</style>