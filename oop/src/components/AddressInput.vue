<template>
  <div :class="className">
    <label :for="'input' + label">{{label}}</label><br/>
    <input :id="'input' + label"
            name="addressLine"
           class='form-control'
           :maxlength='maxlength'
           v-model="localValue" />
  </div>
</template>

<script>
export default {
  name: 'AddressInput',
  components: {},
  props: {
    value: String,
    label: String,
    className: String,
    maxlength: String,
  },
  data() {
    return {
      localValue: null,
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
