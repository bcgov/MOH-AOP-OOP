<template>
  <div>
    <div class="signature-pad-container border rounded">
      <VueSignaturePad
        :width="signaturePadWidth"
        height="200px"
        ref="signaturePad"
        :options="{ onEnd }"
      />
    </div>
    <br />
    <Button
      label="Clear"
      styling="bcgov-normal-white btn"
      v-on:button-click="clear"
    />
  </div>
</template>

<script>
import Vue from "vue";
import VueSignaturePad from "vue-signature-pad";
import Button from "vue-shared-components/src/components/button/Button";
import { isMobile } from "../helpers/user-agent";

Vue.use(VueSignaturePad);

export default {
  name: "SignaturePad",
  components: {
    Button
  },
  data: () => {
    return {
      containsSignature: false
    };
  },
  computed: {
    signaturePadWidth() {
      return isMobile() ? "340px" : "500px";
    }
  },
  methods: {
    clear() {
      this.$refs.signaturePad.clearSignature();
      this.containsSignature = false;
      this.$emit("input", ""); // Empty string instead of null is intentional to avoid thrown error.
    },
    onEnd() {
      this.containsSignature = true;
      const { data } = this.$refs.signaturePad.saveSignature();
      this.$emit("input", data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signature-pad-container {
  display: inline-block;
}
</style>
