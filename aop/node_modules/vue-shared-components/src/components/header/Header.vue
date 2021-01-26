<template>
  <header>
    <nav class="container-fluid navbar navbar-expand-lg navbar-dark"
         aria-label="Header">
      <heading-title classNames="navbar-brand pointer" />
      <heading-image :history="history" classNames="img-fluid d-none d-md-block pointer" :width="181" :src="bcidLogoRev" />
      <heading-image :history="history" classNames="img-fluid d-md-none pointer" :width="64" :src="bcidSymbol" />
      <heading-title classNames="pointer navbar-brand nav-item nav-link" />
      <div id="title" class="navbar-brand">
        {{ name }}
      </div>
    </nav>
  </header>
</template>

<script>
  import "./Header.css";
  import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
  import HeadingTitle from "./HeadingTitle.vue";
  import HeadingImage from "./HeadingImage.vue";

  export default {
    name: "Header",
    props: {
      name: {
        type: String,
        required: true,
      },
      history: {
        type: Object,
        required: true,
      },
    },
    components: {
      "heading-title": HeadingTitle,
      "heading-image": HeadingImage,
    },
    data() {
      return {
        bcidSymbol: `/images/bcid-symbol-rev.svg`,
        bcidLogoRev: `/images/bcid-logo-rev-en.svg`,
      }
    }
  }
</script>
