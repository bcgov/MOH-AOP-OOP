<template>
  <div class="home">
    <div class="container mb-3">
      <h1>Home</h1>
      <hr/>
      <p>Content here.</p>
    </div>
    <ContinueBar @continue='nextPage()'/>
  </div>
</template>

<script>
import pageStateService from '../services/page-state-service';
import routes from '../router/routes';
import { scrollTo } from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';

export default {
  name: 'HomePage',
  components: {
    ContinueBar
  },
  methods: {
    nextPage() {
      const path = routes.YOUR_INFO_PAGE.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    }
  }
}
</script>
