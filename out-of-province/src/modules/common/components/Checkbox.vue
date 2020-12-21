<template>
  <div>
    <label v-bind:for="'input' + label">
      <input v-bind:id="'input' + label"
            type="checkbox"
            v-bind:value="value"
            v-on:input="$emit('input', !!$event.target.value)" />
            {{value}}
      {{label}}
    </label>
  </div>
</template>

<script>

export default {
  name: 'Checkbox',
  components: {},
  props: {
    value: Boolean,
    label: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
