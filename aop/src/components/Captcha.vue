<template>
  <div>
    <div v-show="!confirmed" ref="captcha"></div>
    <div v-if="confirmed" class="text-success">Captcha confirmed.</div>
  </div>
</template>

<script>
export default {
  name: "Captcha",
  data: () => {
    return {
      confirmed: false
    };
  },
  mounted() {
    let self = this;
    let timeout = setInterval(() => {
      if (window.grecaptcha) {
        window.grecaptcha.render(self.$refs.captcha, {
          sitekey: "6LcK9_MZAAAAADr2y0zNSbwoAQ3CX1GIHBOuINs-",
          callback: self.setConfirmation
        });
        clearInterval(timeout);
      }
    }, 1000);
  },
  methods: {
    setConfirmation(token) {
      this.confirmed = true;
      this.$emit("confirm", token);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: scroll;
}
</style>
