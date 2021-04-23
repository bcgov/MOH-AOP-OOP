<template>
  <nav class="container component-container">
    <div class="progress-bar-container">
      <div class="progress-bar" :style="progressBarStyles"></div>
    </div>
    <div class="step-container">
      <a
        href="javascript:void(0);"
        v-for="(route, index) in routes"
        :key="route.path"
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
export default {
  name: "ProgressBar",
  components: {},
  props: {
    currentPath: String,
    routes: Array
  },
  computed: {
    hideMobileStep() {
      return this.$store.state.showMobileProgress;
    },
    hideMobileProgress() {
      return !this.$store.state.showMobileProgress;
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
    }
  },
  methods: {
    onClickLink(path) {
      const index = this.routes.findIndex(el => el.path.includes(path));
      const isPrevRoute = index + 1 < this.currentStepNumber;
      if (isPrevRoute) {
        // If they click on sign out
        if (index === 0) {
          // pop up window
          this.$store.dispatch("showSignOutModal");
        } else {
          // otherwise navigate
          this.$router.push(path);
          scrollTo(0);
        }
      }
    },
    openDropdown() {
      this.$store.dispatch('showMobileProgress');
    },
    closeDropdown() {
      this.$store.dispatch('hideMobileProgress');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.component-container {
  flex: 1;
  padding: 1em 0;
  min-height: 2em;
  margin-top: 0;
  /* min-width: 650px; */
}

@media (min-width: 481px) {
  .component-container {
    margin-top: 24px;
  }
}

.progress-bar-container {
  background-color: #606060;
  border-radius: 0.25rem;
  transform: translateY(-2px);
  height: 0.25rem;
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
.step {
  position: relative;
  -webkit-transform: translateX(-0.5em);
  transform: translateX(-0.5em);
  margin-top: 0.25rem;
  cursor: default;
}
.step:before {
  content: " ";
  position: absolute;
  width: 1em;
  height: 1em;
  border-radius: 100%;
  background: #fff;
  border: 2px solid #606060;
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: 100%;
}
.step-selected:before {
  border: 2px solid #036;
}
.step-passed {
  cursor: pointer;
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
  color: #494949;
  font-weight: normal;
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
  .mobile-progress-bar-container,
  .mobile-step-container {
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
.v-step {
  position: relative;
  margin-top: 0.25rem;
  cursor: default;
}
.v-step:before {
  content: " ";
  position: absolute;
  width: 1em;
  height: 1em;
  border-radius: 100%;
  background: #fff;
  border: 2px solid #606060;
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: 100%;
}
.v-step-selected:before {
  border: 2px solid #036;
}
.v-step-passed {
  cursor: pointer;
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
  color: #494949;
  left: 30px;
  font-weight: normal;
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
