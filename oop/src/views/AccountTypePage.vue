<template>
  <div class="account-type">
    <div class="container">
      <h1>Page content here.</h1>
    </div>
    <ContinueBar :hasLoader='isLoading' @continue="nextPage()" />
  </div>
</template>

<script>
import ContinueBar from '../components/ContinueBar.vue';

export default {
  name: 'AccountTypePage',
  components: {
    ContinueBar
  },
  data: () => {
    return {
      isLoading: false
    }
  },
  methods: {
    nextPage() {
      this.isLoading = true;
    }
  }
}
</script>