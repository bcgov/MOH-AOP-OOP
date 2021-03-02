<template>
  <div :class="className">
    <label :for="'input' + label">{{label}}</label><br/>
    <input :id="'input' + label"
           class='form-control'
           :value="value"
           :maxlength='maxlength'
           @input="emitInput($event)" />
  </div>
</template>

<script>
export default {
  name: 'Input',
  components: {},
  props: {
    value: String,
    label: String,
    className: String,
    maxlength: String,
  },
  methods: {
    emitInput(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>
