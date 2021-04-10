<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-5">
        <h1>Maintenance Mode</h1>
        <hr/>
        <p>This application is temporarily unavailable. We apologize for any inconvenience. Please try again later.</p>
      </div>
    </PageContent>
  </div>
</template>

<script>
import PageContent from '../components/PageContent.vue';

export default {
  name: 'MaintenancePage',
  components: {
    PageContent,
  }
}
</script>
