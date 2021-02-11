<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./services/page-state-service";

export default {
  name: "App",
  created() {
    const { version: projectVersion } = require('../package.json');
    console.log('Canonical Version:', projectVersion);
  }
};
</script>
