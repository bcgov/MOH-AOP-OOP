<template>
  <div id="app">
    <Header title='Out-of-Province Form' />
    <ProgressBar :currentPath='$router.currentRoute.path'
                  :routes='stepRoutes'/>
    <div class="pt-3 pt-sm-5">
      <router-view/>
    </div>
    <Footer :version='version' />
  </div>
</template>

<script>
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import project from '../package.json';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
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
      version: project.version,
      stepRoutes: stepRoutes
    };
  }
}
</script>
