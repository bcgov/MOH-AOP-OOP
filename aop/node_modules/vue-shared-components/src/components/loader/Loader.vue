<template>
  <div>
    <div :class="loaderCss" />
    <div v-if="page">
      Loading... Please Wait
    </div>
  </div>
</template>

<script>
  import "./Loader.css";
  import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

  export default {
    name: "Loader",
    props: {
      page: {
        type: Boolean,
        required: false,
        default: false,
      }
    },
    data() {
      return {
        loaderCss: this.page ? "bcgov-page-loader" : "bcgov-btn-loader",
      }
    }
  }
</script>
