<template>
  <div v-if='isCurrentPathInSteps'
       class='progress-bar-component'>
    <div class='progress-bar-container'>
      <div class='progress-bar' :style='progressBarStyles'></div>
    </div>
    <div class='step-container'>
      <a href="javascript:void(0);"
          v-for='route in routes'
          :key='route.path'
          :style='getLinkStyles(route.path)'
          @click="onClickLink(route.path)">
        <div class="step">
          <div class='step-text'>{{route.title}}</div>
        </div>
      </a>
    </div>
    <div class="mobile-step p-3 border-bottom">Step {{currentStepNumber}}/{{routes.length}} - {{currentStepTitle}}</div>
  </div>
</template>

<script>
import environment from '../settings';

export default {
  name: 'ProgressBar',
  components: {},
  props: {
    currentPath: String,
    routes: Array,
  },
  computed: {
    progressBarStyles() {
      const index = this.routes.findIndex((element) => {
        return element.path === this.currentPath;
      });
      if (!this.routes || this.routes.length === 0) {
        return {};
      }
      return {
        width: (100 / this.routes.length * index) + (100 / this.routes.length / 2) + '%'
      };
    },
    currentStepNumber() {
      const index = this.routes.findIndex((element) => {
        return element.path === this.currentPath;
      });
      return index + 1;
    },
    currentStepTitle() {
      const index = this.routes.findIndex((element) => {
        return element.path === this.currentPath;
      });
      if (this.routes[index]) {
        return this.routes[index].title;
      }
      return '';
    },
    isCurrentPathInSteps() {
      const index = this.routes.findIndex((element) => {
        return element.path === this.currentPath;
      });
      return index > -1;
    }
  },
  methods: {
    onClickLink: function(path) {
      if (this.currentPath !== path && 
        (
          environment.bypassRouteGuards ||
          this.isPastPath(path)
        )) {
        this.$router.push(path);
      }
    },
    isPastPath(path) {
      for (let i=0; i<this.routes.length; i++) {
        if (this.routes[i].path === this.currentPath) {
          return false;
        } else if (this.routes[i].path === path) {
          return true;
        }
      }
      return false;
    },
    getLinkStyles(path) {
      return {
        cursor: this.isPastPath(path) ? 'pointer' : 'default'
      }
    },
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progress-bar-component {
  flex: 1;
  padding: 1em 2em;
  min-height: 2em;
  /* min-width: 650px; */
}
.progress-bar-container {
  background-color: #adb5bd;
  height: .5rem;
  border-radius: .25rem;
}
.progress-bar {
  height: 100%;
  border-radius: .25rem;
}
.step-container {
  display: flex;
  justify-content: space-around;
}
.step {
  position: relative;
  -webkit-transform: translateX(-.5em);
  transform: translateX(-.5em);
  margin-top: .25rem;
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
.mobile-step {
  display: none;
  font-weight: bold;
}
@media only screen and (max-width: 575px) {
  .progress-bar-component {
    padding: 0;
  }
  .progress-bar-container,
  .step-container {
    display: none;
  }
  .mobile-step {
    display: block;
  }
}
</style>
