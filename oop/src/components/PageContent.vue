<template>
  <div class="page-content" :style="pageContentStyles">
    <slot>Page content here.</slot>
  </div>
</template>

<script>
export default {
  name: 'PageContent',
  data: () => {
    return {
      headerHeight: 0,
      footerHeight: 0,
      stepperHeight: 0,
      continueBarHeight: 0,
    }
  },
  created() {
    setTimeout(() => {
      const headerEl = document.querySelector('header');
      const footerEl = document.querySelector('footer');
      const stepperEl = document.querySelector('.progress-bar-component');
      const continueBarEl = document.querySelector('.continue-bar');

      if (headerEl) {
        this.headerHeight = headerEl.offsetHeight;
      }
      if (footerEl) {
        this.footerHeight = footerEl.offsetHeight;
      }
      if (stepperEl) {
        this.stepperHeight = stepperEl.offsetHeight;
      }
      if (continueBarEl) {
        this.continueBarHeight = continueBarEl.offsetHeight;
      }
    }, 0);
  },
  computed: {
    minHeightDelta() {
      let delta = 0;
      delta += this.headerHeight;
      delta += this.footerHeight;
      delta += this.stepperHeight;
      delta += this.continueBarHeight;
      return delta;
    },
    pageContentStyles() {
      return {
        'min-height': 'calc(100vh - ' + this.minHeightDelta + 'px)',
      }
    }
  }
}
</script>

<style>
@media print {
  .page-content {
    min-height: auto !important;
  }
}
</style>
