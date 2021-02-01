<template>
  <div :class="className">
    <label v-bind:for="'textarea' + label">{{label}}:</label><br/>
    <textarea :id="'textarea' + label"
           class='form-control'
           :value="value"
           @input="emitInput($event)" />
  </div>
</template>

<script>

export default {
  name: 'TextArea',
  components: {},
  props: {
    value: String,
    label: String,
    className: String,
  },
  methods: {
    emitInput(event) {
      this.$emit('', event.target.value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
