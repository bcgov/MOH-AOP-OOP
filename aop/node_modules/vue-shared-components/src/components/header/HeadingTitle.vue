<template>
  <div :class="classNames" aria-labelledby="title" />
</template>

<script>
  import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

  export default {
    name: 'HeadingTitle',
    props: {
      classNames: String,
    }
  }
</script>
