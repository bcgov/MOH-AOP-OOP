<template>
  <div class="home">
    <div class="container">
      <h1>Home</h1>
      <hr/>
      <p>Content here.</p>
    </div>
    <ContinueBar />
  </div>
</template>

<script>
import ContinueBar from '../components/ContinueBar.vue';

export default {
  name: 'HomePage',
  components: {
    ContinueBar
  }
}
</script>
