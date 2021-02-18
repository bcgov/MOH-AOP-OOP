<template>
  <div :class="className">
    <label :for="'input' + label">{{label}}</label><br/>
    <input :id="'input' + label"
           class='form-control'
           :class='className'
           :value="value"
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
  },
  methods: {
    emitInput(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
