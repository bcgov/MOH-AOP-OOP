<template>
  <div>
    <div class="bcgov-btn-loader"></div>
  </div>
</template>

<script>
  export default {
    name: "Loader",
  }
</script>

<style scoped>

.bcgov-btn-loader {
  height: 15px;
  width: 15px;
  color: #ffffff;
  border: 2px solid;
  border-radius: 50%;
  border-top-color: transparent;
  animation: rotate 2s linear infinite;
  display: inline-block;
  margin-right: 10px;
  margin-top: 3px;
  vertical-align: text-top;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
