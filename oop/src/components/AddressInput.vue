<template>
  <div :class="className">
    <label :for="'input' + label">{{label}}</label><br/>
    <input :id="'input' + label"
            name="addressLine"
           class='form-control'
           :maxlength='maxlength'
           :modelValue="modelValue"
           @input="inputHandler($event)" />
  </div>
</template>

<script>
export default {
  name: 'AddressInput',
  components: {},
  props: {
    modelValue: {
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
  emits: ['update:modelValue'],
  methods: {
    inputHandler(event) {
      let value = event.target.value;
      this.$emit('update:modelValue', value);
    }
  }
}
</script>
