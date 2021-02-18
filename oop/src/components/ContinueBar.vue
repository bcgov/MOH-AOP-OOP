<template>
  <div class='continue-bar'>
    <div class="d-flex flex-row-reverse p-3 container">
      <!-- <button @click="onClick()">Continue</button> -->
      <Button label="Continue"
              :hasLoader='hasLoader'
              @click='onContinue()'/>
    </div>
  </div>
</template>

<script>
import Button from '../components/Button.vue';

export default {
  name: 'ContinueBar',
  components: {
    Button
  },
  props: {
    hasLoader: Boolean
  },
  methods: {
    onContinue() {
      this.$emit('continue')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.continue-bar {
  background-color: #cdd9e4;
}
</style>