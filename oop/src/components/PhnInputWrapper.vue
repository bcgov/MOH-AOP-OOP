<template>
  <div>
    <PhnInput
      :label="'PHN: Dependent ' + (childIndex + 1)"
      :id="'phn' + childIndex"
      class="phn-input"
      v-model="phnData"
      @input="handleFocus"
      @blur="handleBlur"
      :cypressId="'phn' + childIndex"
    />
    <div
      class="text-danger"
      v-if="(v$.phnData.phnValidator.$invalid || v$.phnData.phnNineValidator.$invalid) && v$.phnData.$dirty"
      aria-live="assertive"
    >
      This is not a valid Personal Health Number.
    </div>
  </div>
</template>

<script>
import { PhnInput } from "common-lib-vue";
import useVuelidate from "@vuelidate/core";
import { phnNineValidator } from '../helpers/validators';
import { optionalValidator, phnValidator } from "common-lib-vue";

export default {
  name: "PhnInputWrapper",
  components: {
    PhnInput,
  },
  mounted() {
    if (this.childPhn && this.childPhn.value) {
      this.phnData = this.childPhn.value;
    }
  },
  setup() {
    return { v$: useVuelidate({}) };
  },
  data: () => {
    return {
      phnData: null,
    };
  },
  props: {
    childIndex: {
      type: Number,
    },
    childPhn: {
      type: Object,
    },
  },
  validations() {
    const validations = {
      phnData: {
        phnValidator: optionalValidator(phnValidator),
        phnNineValidator: optionalValidator(phnNineValidator)
      },
    };
    return validations;
  },
  methods: {
    getChildVModel() {
      return String("phn1") + this.childIndex;
    },
    handleFocus() {
      return this.v$.$reset();
    },
    handleBlur() {
      this.$emit("updatePhn", this.phnData, this.childIndex);
      return this.v$.phnData.$touch();
    },
  },
  watch: {
    //the valueOld argument isn't used, but it's still here in the codebase for future debugging purposes
    //eslint-disable-next-line
    childPhn: function (valueNew, valueOld) {
      //updates Vue data when the prop changes
      this.phnData = valueNew.value;
    },
  },
};
</script>

<style></style>
