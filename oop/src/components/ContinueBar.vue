<template>
  <div :class='componentClass'>
    <div class="d-flex flex-row-reverse p-3 container">
      <Button :label='buttonLabel'
              :hasLoader='hasLoader'
              @click='onContinue()'/>
    </div>
  </div>
</template>

<script>
import { Button } from 'common-lib-vue';

export default {
  name: 'ContinueBar',
  components: {
    Button
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
    isSticky: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    onContinue() {
      this.$emit('continue');
    }
  },
  computed: {
    componentClass() {
      return `continue-bar ${this.isSticky ? 'sticky' : ''}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.continue-bar {
  background-color: #cdd9e4;
}
.continue-bar.sticky {
  position: sticky;
  bottom: 0;
}
</style>