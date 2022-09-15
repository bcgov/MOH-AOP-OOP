<template>
  <div id="app">
    <Header :title='pageTitle'
            imagePath='/oop/images/' />
    <main>
      <div class="container stepper">
        <PageStepper :currentPath='$router.currentRoute.value.path'
                    :routes='stepRoutes'
                    :cypressId="'pageStepper'"
                    @onClickLink='handleClickStepperLink($event)'/>
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
  Footer,
  PageStepper,
} from 'common-lib-vue';
import stepRoutes from '@/router/step-routes';
import pageStateService from '@/services/page-state-service';
import { isPastPath } from '@/router/routes';
import environment from '@/settings';
import { scrollTo } from '@/helpers/scroll';

export default {
  name: 'App',
  components: {
    Header: Header,
    Footer: Footer,
    PageStepper: PageStepper,
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
  },
  methods: {
    handleClickStepperLink(path) {
      if (this.currentPath !== path && 
        (
          environment.bypassRouteGuards ||
          isPastPath(path, this.currentPath)
        )) {
        pageStateService.setPageIncomplete(this.currentPath);
        pageStateService.setPageComplete(path);
        this.$router.push(path);
        scrollTo(0);
      }
    },
  }
}
</script>

<style scoped>
main {
  padding: 0;
}
@media only screen and (max-width: 575px) {
  .container.stepper {
    padding: 0;
  }
}
</style>
