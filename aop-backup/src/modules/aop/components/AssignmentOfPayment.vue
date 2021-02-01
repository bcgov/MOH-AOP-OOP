<template>
  <main>
    <Header :heading="'Upload Tool for: Diagnostic Facility Services Assignment of Payment & Medical Director Authorization, Laboratory Services Outpatient Operator Payment Administration and related forms'"/>
    <ProgressBar :routes='stepRoutes' :currentPath='$route.path' />
    <div class="container py-5">
      <router-view></router-view>
    </div>
    <Footer />
  </main>
</template>

<script>
import Footer from 'vue-shared-components/src/components/footer/Footer';
import Header from '../../common/components/Header';
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

.footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
}
</style>
