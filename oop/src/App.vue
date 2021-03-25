<template>
  <div id="app">
    <Header :title='pageTitle' />
    <div class="container">
      <ProgressBar :currentPath='$router.currentRoute.path'
                  :routes='stepRoutes'/>
    </div>
    <router-view/>
    <Footer :version='version' />
  </div>
</template>

<script>
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import 'common-lib-vue/dist/common-lib-vue.css';
import './styles/styles.css';

import project from '../package.json';
// import {
//   Header,
//   Footer
// } from 'common-lib-vue';
import Header from '../src/components/Header.vue';
import Footer from '../src/components/Footer.vue';
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
