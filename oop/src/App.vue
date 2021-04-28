<template>
  <div id="app">
    <Header :title='pageTitle' />
    <main>
      <div class="container stepper">
        <ProgressBar :currentPath='$router.currentRoute.path'
                    :routes='stepRoutes'/>
      </div>
      <router-view/>
    </main>
    <Footer :version='version' />
  </div>
</template>

<script>
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import 'common-lib-vue/dist/common-lib-vue.css';
import './styles/styles.css';

import project from '../package.json';
import {
  Header,
  Footer
} from 'common-lib-vue';
import ProgressBar from '@/components/ProgressBar.vue';
import stepRoutes from '@/router/step-routes';

export default {
  name: 'App',
  components: {
    Header: Header,
    Footer: Footer,
    ProgressBar: ProgressBar
  },
  data: () => {
    return {
      pageTitle: 'MSP Permanent Move Outside of B.C.',
      version: project.version,
      stepRoutes: stepRoutes,
    };
  },
  created() {
    document.title = this.pageTitle;
  }
}
</script>

<style scoped>
@media only screen and (max-width: 575px) {
  .container.stepper {
    padding: 0;
  }
}
</style>
