<template>
  <div id="app">
    <Header name='Out-of-Province Move' />
    <router-view/>
    <div>Version: {{version}}</div>
  </div>
</template>

<script>
import project from '../package.json';
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  components: {
    Header: Header
  },
  data: () => {
    return {
      version: project.version
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
