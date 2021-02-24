<template>
  <div :class="className">
    <label :for="id">{{label}}</label><br/>
    <masked-input
        :id="id"
        type="text"
        name="phn"
        class="form-control"
        v-model="localValue"
        :mask="mask"
        :guide="false"
        placeholderChar="#">
      </masked-input>
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask';

export default {
  name: 'PhnInput',
  components: {
    MaskedInput
  },
  props: {
    id: String,
    value: String,
    label: String,
    className: String,
  },
  data() {
    return {
      localValue: null,
      mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
    }
  },
  created() {
    this.localValue = this.value;
  },
  watch: {
    localValue(newValue) {
      this.$emit('input', newValue);
    }
  }
}
</script>
