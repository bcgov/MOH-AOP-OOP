<template>
  <div class='continue-bar'>
    <div class="d-flex flex-row-reverse p-3 container">
      <ButtonComponent :label='buttonLabel'
              :hasLoader='hasLoader'
              @click='onContinue()'/>
    </div>
  </div>
</template>

<script>
import { ButtonComponent } from 'common-lib-vue';
// import Button from './Button.vue';

export default {
  name: 'ContinueBar',
  components: {
    ButtonComponent
  },
  props: {
    hasLoader: {
      type: Boolean,
      default: false
    },
    buttonLabel: {
      type: String,
      default: 'Continue'
    },
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
  position: sticky;
  bottom: 0;
}
</style>
