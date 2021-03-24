export default {
  mounted() {
    const headers = document.getElementsByTagName("h1");
    if (headers[0]) {
      headers[0].focus();
    }
  }
};
