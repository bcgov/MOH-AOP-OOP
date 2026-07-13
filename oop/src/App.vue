<template>
  <div id="app">
    <HeaderComponent :title="pageTitle" imagePath="/oop/images/" />
    <main>
      <div class="container stepper">
        <PageStepper
          :currentPath="$router.currentRoute.value.path"
          :routes="stepRoutes"
          :cypressId="'pageStepper'"
          @onClickLink="handleClickStepperLink($event)"
          @toggleShowMobileDetails='handleToggleShowMobileStepperDetails($event)'
          :isMobileStepperOpen='isMobileStepperOpen'
        />
      </div>
      <router-view />
    </main>
    <FooterComponent :version="version" />
  </div>
</template>

<script>
import "@bcgov/bootstrap-v5-theme/css/bootstrap-theme.min.css";
import "common-lib-vue/dist/common-lib-vue.css";
import "./styles/styles.css";

import project from "../package.json";
import { HeaderComponent, FooterComponent, PageStepper } from "common-lib-vue";
import stepRoutes from "@/router/step-routes";
import pageStateService from "@/services/page-state-service";
import { isPastPath } from "@/router/routes";
import environment from "@/settings";
import { scrollTo } from "@/helpers/scroll";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
    PageStepper: PageStepper,
  },
  data: () => {
    return {
      pageTitle: "MSP Permanent Move Outside of B.C.",
      version: project.version,
      stepRoutes: stepRoutes,
      isMobileStepperOpen: false
    };
  },
  created() {
    document.title = this.pageTitle;
  },
  methods: {
    handleClickStepperLink(path) {
      if (
        this.currentPath !== path &&
        (environment.bypassRouteGuards || isPastPath(path, this.currentPath))
      ) {
        pageStateService.setPageIncomplete(this.currentPath);
        pageStateService.setPageComplete(path);
        this.$router.push(path);
        scrollTo(0);
      }
    },
    handleToggleShowMobileStepperDetails() {
      this.isMobileStepperOpen = !this.isMobileStepperOpen;
    }
  },
};
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
