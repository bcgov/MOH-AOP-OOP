<template>
  <div id="app">
    <Header title='Out-of-Province Form' />
    <router-view/>
    <Footer :version='version' />
  </div>
</template>

<script>
import project from '../package.json';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header: Header,
    Footer: Footer
  },
  data: () => {
    return {
      version: project.version
    };
  }
}
</script>
