<template>
  <div class="your-info">
    <div class="container mb-3">
      <h1>Your Information</h1>
      <p>To complete the Out of Province form, you must provide your PHN number that matches your last name.</p>
      <hr/>
      <div class="row">
        <div class="col-sm-7">
          <Input label='Last name' />
          <Input label='Personal Health Number (PHN)' />
          <Input label='Email (Optional)' />
          <Input label='Phone number' className='mb-3' />
        </div>
        <div class="col-sm-5">
          <h4>Tip</h4>
          <p>Tip content here</p>
        </div>
      </div>
      
    </div>
    <ContinueBar @continue='nextPage()' />
  </div>
</template>
<script>
import pageStateService from '../services/page-state-service';
import routes from '../router/routes';
import { scrollTo } from '../helpers/scroll';
import ContinueBar from '../components/ContinueBar.vue';
import Input from '../components/Input.vue';

export default {
  name: 'YourInfoPage',
  components: {
    ContinueBar,
    Input
  },
  methods: {
    nextPage() {
      pageStateService.setPageIncomplete(routes.YOUR_INFO_PAGE.path)
      const path = routes.ACCOUNT_TYPE_PAGE.path;
      pageStateService.setPageComplete(path);
      this.$router.push(path);
      scrollTo(0);
    }
  }
}
</script>