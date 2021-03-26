<template>
  <nav class="container component-container">
    <div class="progress-bar-container">
      <div class="progress-bar" :style="progressBarStyles"></div>
    </div>
    <div class="step-container">
      <a
        href="javascript:void(0);"
        v-for="route in routes"
        :key="route.path"
        @click="onClickLink(route.path)"
      >
        <div class="step">
          <div class="step-text">{{ route.title }}</div>
        </div>
      </a>
    </div>
    <div v-bind:class="{ hide: hideMobileStep }" class="mobile-step-container p-3 border-bottom">
      Step {{ currentStepNumber }}/{{ routes.length }} - {{ currentStepTitle }}
      <div class="chevron-container" @click="openDropdown">
        <font-awesome-icon icon="chevron-down" />
      </div>
    </div>
    <div v-bind:class="{ hide: hideMobileProgress }" class="mobile-progress-bar-container p-3 border-bottom">
      <div class="v-progress-bar-container">
        <div class="v-progress-bar" :style="verticalProgressBarStyles"></div>
      </div>
      <div class="v-step-container">
        <a
        href="javascript:void(0);"
        v-for="route in routes"
        :key="route.path"
        @click="onClickLink(route.path)"
      >
        <div class="v-step">
          <div class="v-step-text">{{ route.title }}</div>
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
  data: () => {
    return {
      hideMobileStep: false,
      hideMobileProgress: true,
    };   
  },
  computed: {
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
        height:
          (100 / this.routes.length) * index +
          100 / this.routes.length / 2 +
          "%"
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
      this.hideMobileStep = true;
      this.hideMobileProgress = false;
    },
    closeDropdown() {
      this.hideMobileStep = false;
      this.hideMobileProgress = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.component-container {
  flex: 1;
  padding: 1em 2em;
  min-height: 2em;
  /* min-width: 650px; */
}
.progress-bar-container {
  background-color: #adb5bd;
  height: 0.5rem;
  border-radius: 0.25rem;
}
.progress-bar {
  height: 100%;
  border-radius: 0.25rem;
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
  margin-top: 0.25rem;
}
.step:before {
  content: " ";
  position: absolute;
  width: 1em;
  height: 1em;
  border-radius: 100%;
  background: #fff;
  border: 3px solid #036;
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: 100%;
}
.step-text {
  position: absolute;
  -webkit-transform: translateX(-37%);
  transform: translateX(-37%);
  white-space: nowrap;
  color: #164d80;
}
.mobile-progress-bar-container {
  display: none;
  font-weight: bold;
  height:260px;
  position: relative;
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
  justify-content: space-around;
  position: absolute;
  height: 80%;
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
  border: 3px solid #036;
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: 100%;
}
.v-step-text {
  position: absolute;
  -webkit-transform: translateY(-80%);
  transform: translateY(-80%);
  white-space: nowrap;
  color: #164d80;
  left: 30px;
}

.v-progress-bar-container {
  background-color: #adb5bd;
  width: 0.5rem;
  border-radius: 0.25rem;
  position: absolute;
  height: 80%;
  left: 20px;
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
  background-color: #38598a;
  transition: height 0.6s ease;
}
</style>
