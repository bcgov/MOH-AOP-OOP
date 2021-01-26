<template>
  <img
    :class="classNames"
    :src="src"
    :width="width"
    height="44"
    alt="B.C. Government Logo"
    @click="handleClick"
    @keydown="handleClick"
    role="img"
  />
</template>

<script>
  import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

  export default {
    name: 'HeadingImage',
    props: {
      history: Object,
      classNames: String,
      width: Number,
      src: String,
    },
    methods: {
      handleClick() {
        const historyObj = this.history;
        historyObj.push("/");
      }
    }
  }
</script>
