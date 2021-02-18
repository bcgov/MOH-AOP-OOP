<template>
  <nav class="component-container">
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
    <div class="mobile-step p-3 border-bottom">
      Step {{ currentStepNumber }}/{{ routes.length }} - {{ currentStepTitle }}
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
    onClickLink: function(path) {}
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
  cursor: default;
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
.mobile-step {
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
  .mobile-step {
    display: block;
  }
}
</style>
