<template>
  <div>
    <div v-if="isFetchingNewCaptcha">Loading...</div>
    <div v-if="!isFetchingNewCaptcha">
      <div v-html="captchaSVG"
          class="captcha-image-container"></div>
      <div class="button-container">
        <button>Play audio</button>
        <button @click="fetchNewCaptcha()">Try another image</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const CAPTCHA_IMAGE_URL = '/captcha';

export default {
  name: 'Captcha',
  props: {
    apiBasePath: {
      type: String,
      default: null,
      required: true
    },
    nonce: {
      type: String,
      default: null,
    }
  },
  data: () => {
    return {
      isFetchingNewCaptcha: true,
      captchaSVG: null,
    }
  },
  created() {
    this.fetchNewCaptcha();
  },
  methods: {
    fetchNewCaptcha() {
      this.isFetchingNewCaptcha = true;

      axios.post(this.apiBasePath + CAPTCHA_IMAGE_URL, {
        nonce: this.nonce
      })
        .then((response) => {
          const payload = response.data;

          this.isFetchingNewCaptcha = false;
          this.captchaSVG = payload.captcha;
          this.$emit('captcha-loaded');
        });
    }
  }
}
</script>

<style scoped>
.captcha-image-container {
  display: inline-block;
  border: solid thin #000;
}
</style>
