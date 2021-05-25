<template>
  <div :class="className">
    <label :for="'input' + label">{{label}}</label><br/>
    <input :id="'input' + label"
            name="addressLine"
           class='form-control'
           :maxlength='maxlength'
           :value="value"
           @input="inputHandler($event)" />
  </div>
</template>

<script>
export default {
  name: 'AddressInput',
  components: {},
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    maxlength: {
      type: String,
      default: '1000'
    },
  },
  methods: {
    inputHandler(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>
