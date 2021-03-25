<template>
  <header>
    <nav class="container-fluid navbar navbar-expand-lg navbar-dark" aria-label="Header">
      <div class="container">
        <div>
          <div class="logo-container mr-3 d-inline-block align-middle">
            <a href="https://gov.bc.ca"
              target="_blank">
              <img
                alt="BC Logo"
                classNames="img-fluid d-none d-md-block pointer"
                :width="181"
                :src="bcidLogoRev"
              />
            </a>
            
          </div>
          <div class="title-container align-middle">
            <div class="navbar-brand mr-0">
              {{ title }}
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
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
        // bcgovLogo: `/images/bcgov-logo.svg`,
        // bcgovLogoText: `/images/bcgov-logo-text.svg`,
        // bcgovLogoPrint: `/images/bcgov-logo-print.png`,
        bcidSymbol: "/images/bcid-symbol-rev.svg",
        bcidLogoRev: "/images/bcid-logo-rev-en.svg"
      }
    }
  }
</script>

<style scoped>
.navbar {
  min-height: 65px;
}
.navbar > .container-fluid {
  width: 95%;
  justify-content: inherit;
}
.pointer {
  cursor: pointer;
}
.logo-container {
  width: 181px;
  height: 44px;
}
.print-logo {
  display: none;
}
@media (max-width: 767.98px) {
  .logo-container {
    width: 64px;
    height: 44px;
  }
}
@media print {
  .print-hide {
    display: none !important;
  }
  .navbar {
    display: block;
  }
  .print-logo {
    display: inline-block;
  }
  .navbar-dark .navbar-brand {
    color: #000;
  }
}

@media (min-width: 768px) {
    .title-container {
        display: inline-block !important;
    }
}
</style>