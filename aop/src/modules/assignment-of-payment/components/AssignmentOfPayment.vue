<template>
  <main>
    <Header name="Diagnostic Facilities Services - Upload Tool for:<br/> Assignment of Payment & Outpatient Operator Payment Administration Forms" :history="history" />
    <ProgressBar :routes='stepRoutes' :currentPath='$route.path' />
    <div class="container py-5">
      <router-view></router-view>
    </div>
    <Footer />
  </main>
</template>

<script>
import Footer from 'vue-shared-components/src/components/footer/Footer';
import Header from 'vue-shared-components/src/components/header/Header';
import ProgressBar from '../../common/components/ProgressBar';
import stepRoutes from '../step-routes';

export default {
  name: 'AssignmentOfPayment',
  components: {
    Footer,
    Header,
    ProgressBar
  },
  data: () => {
    return {
      history: {},
      stepRoutes: stepRoutes
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  padding: 0;
}
</style>
