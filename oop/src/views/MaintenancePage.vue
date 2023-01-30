<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-5">
        <h1>Maintenance Mode</h1>
        <hr/>
        <p>{{ maintenanceMessage }}</p>
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
  },
  data: () => {
    return {
      maintenanceMessage:
        "This application is currently unavailable due to maintenance. Please try again later.",
    };
  },
  created() {
    if (this && this.$store && this.$store.state && this.$store.state.form && this.$store.state.form.maintenanceMessage) {
      this.maintenanceMessage = this.$store.state.form.maintenanceMessage;
    }
  },
}
</script>
