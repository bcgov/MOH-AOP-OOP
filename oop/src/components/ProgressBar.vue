<template>
  <nav v-if='isCurrentPathInSteps'
      class="component-container">
    <div class="progress-bar-container">
      <div class="progress-bar" :style="progressBarStyles"></div>
    </div>
    <div class="step-container">
      <a
        href="javascript:void(0);"
        v-for="(route, index) in routes"
        :key="route.path"
        :style='getLinkStyles(route.path)'
        @click="onClickLink(route.path)"
      >
        <div class="step" v-bind:class="{'step-selected': index + 1 === currentStepNumber, 'step-passed': index + 1 < currentStepNumber}">
          <div class="step-text" v-bind:class="{'v-step-text-selected': index + 1 === currentStepNumber}">{{ route.title }}</div>
        </div>
      </a>
    </div>
    <div v-bind:class="{ hide: hideMobileStep }" class="mobile-step-container p-3 border-bottom">
      <div class="pb-3">Step {{ currentStepNumber }}/{{ routes.length }} - {{ currentStepTitle }}</div>
      <div class="chevron-container" @click="openDropdown">
        <font-awesome-icon icon="chevron-down" />
      </div>
    </div>
    <div v-bind:class="{ hide: hideMobileProgress }" class="mobile-progress-bar-container p-3 pt-5 border-bottom">
      <div class="v-progress-bar-container">
        <div class="v-progress-bar" :style="verticalProgressBarStyles"></div>
      </div>
      <div class="v-step-container">
        <a
        href="javascript:void(0);"
        v-for="(route, index) in routes"
        :key="route.path"
        @click="onClickLink(route.path)"
      >
        <div class="v-step" v-bind:class="{'v-step-selected': index + 1 === currentStepNumber, 'v-step-passed': index + 1 < currentStepNumber}">
          <div class="v-step-text" v-bind:class="{'v-step-text-selected': index + 1 === currentStepNumber}" >{{ route.title }}</div>
        </div>
      </a>
      </div>
      <div class="chevron-container" @click="closeDropdown">
        <font-awesome-icon icon="chevron-up" />
      </div>
    </div>
  </nav>
</template>

<script>
import pageStateService from '../services/page-state-service';
import { isPastPath } from '../router/routes';
import { scrollTo } from '../helpers/scroll';
import environment from '../settings';
import {
  MODULE_NAME,
  SET_SHOW_MOBILE_STEPPER_DETAILS,
} from '../store/modules/app';

export default {
  name: "ProgressBar",
  components: {},
  props: {
    currentPath: String,
    routes: Array
  },
  computed: {
    hideMobileStep() {
      return this.$store.state.app.showMobileStepperDetails;
    },
    hideMobileProgress() {
      return !this.$store.state.app.showMobileStepperDetails;
    },
    progressBarStyles() {
      const index = this.routes.findIndex(element => {
        return element.path === this.currentPath;
      });
      return {
        width:
          (100 / this.routes.length) * index +
          100 / this.routes.length / 2 +
          "%"
      };
    },
    verticalProgressBarStyles() {
      const index = this.routes.findIndex(element => {
        return element.path === this.currentPath;
      });
      return {     
        height: index / (this.routes.length - 1) * 100 + "%"
      };
    },
    currentStepNumber() {
      const index = this.routes.findIndex(element => {
        return element.path.includes(this.currentPath);
      });
      return index + 1;
    },
    currentStepTitle() {
      const index = this.routes.findIndex(element => {
        return element.path.includes(this.currentPath);
      });
      return this.routes[index].title;
    },
    isCurrentPathInSteps() {
      const index = this.routes.findIndex((element) => {
        return element.path === this.currentPath;
      });
      return index > -1;
    }
  },
  methods: {
    onClickLink(path) {
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
    getLinkStyles(path) {
      return {
        cursor: isPastPath(path, this.currentPath) ? 'pointer' : 'default'
      }
    },
    openDropdown() {
      this.$store.dispatch(MODULE_NAME + '/' + SET_SHOW_MOBILE_STEPPER_DETAILS, true);
    },
    closeDropdown() {
      this.$store.dispatch(MODULE_NAME + '/' + SET_SHOW_MOBILE_STEPPER_DETAILS, false);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.component-container {
  flex: 1;
  padding: 2em 0em;
  min-height: 65px;
  /* min-width: 650px; */
}
.progress-bar-container {
  background-color: #adb5bd;
  border-radius: 0.25rem;
  transform: translateY(-2px);
  height: 0.5rem;
}
.progress-bar {
  height: 100%;
  border-radius: 0.25rem;
  background: #036;
}
.step-container {
  display: flex;
  justify-content: space-around;
}
.step-container a {
  cursor: pointer;
}
.step {
  position: relative;
  -webkit-transform: translateX(-0.5em);
  transform: translateX(-0.5em);
  margin-top: 2px;
}
.step:before {
  content: " ";
  position: absolute;
  width: 1em;
  height: 1em;
  border-radius: 100%;
  background: #fff;
  color: #000;
  border: 2px solid #606060;
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: 100%;
}
.step-selected:before {
  border: 2px solid #036;
}
.step-passed:before {
  border: 2px solid #036;
  background: #036;
}
.step-text {
  position: absolute;
  -webkit-transform: translateX(-37%);
  transform: translateX(-37%);
  white-space: nowrap;
  color: #000;
  background: #FFF;
  font-weight: normal;
  font-size: 13.33px;
}
.step-text-selected {
  font-weight: bold;
}
.mobile-progress-bar-container {
  display: none;
  font-weight: bold;
  height: 260px;
  position: relative;
  padding-top: 16px;
}
.mobile-step-container {
  display: none;
  font-weight: bold;
}
@media only screen and (max-width: 480px) {
  .component-container {
    padding: 0;
  }
  .progress-bar-container,
  .step-container {
    display: none;
  }
  .mobile-step-container {
    display: block;
    font-size: 13.33px;
  }
  .mobile-progress-bar-container {
    display: block;
  }
}

.hide {
  display: none;
}

.chevron-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
}

.v-step-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  height: 60%;
}
.v-step-container a {
  cursor: pointer;
}
.v-step {
  position: relative;
  margin-top: 0.25rem;
}
.v-step:before {
  content: " ";
  position: absolute;
  width: 1em;
  height: 1em;
  border-radius: 100%;
  background: #fff;
  color: #000;
  border: 2px solid #606060;
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: 100%;
}
.v-step-selected:before {
  border: 2px solid #036;
}
.v-step-passed:before {
  border: 2px solid #036;
  background: #036;
}
.v-step-text {
  position: absolute;
  -webkit-transform: translateY(-80%);
  transform: translateY(-80%);
  white-space: nowrap;
  color: #000;
  left: 30px;
  font-weight: normal;
  font-size: 13.33px;
}
.v-step-text-selected {
  font-weight: bold;
}
.v-progress-bar-container {
  background-color: #606060;
  width: 0.25rem;
  border-radius: 0.25rem;
  position: absolute;
  height: 60%;
  left: 22px;
}
.v-progress-bar {
  width: 100%;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #036;
  transition: height 0.6s ease;
}
</style>
