<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1>Review request</h1>
        <p>Review your request before submission</p>
        <hr/>

        <div class="row mt-3">
          <div class="col-10">
            <h2>Your Information</h2>
          </div>
          <div class="col-2 text-right">
            <a href="javascript:void(0)" @click="navigateToYourInfoPage()">Edit</a>
          </div>
        </div>
        <ReviewTable :elements='yourInfoTableData' />

        <div class="row mt-5">
          <div class="col-10">
            <h2>Account Type</h2>
          </div>
          <div class="col-2 text-right">
            <a href="javascript:void(0)" @click="navigateToAccountTypePage()">Edit</a>
          </div>
        </div>
        <ReviewTable :elements='accountTypeTableData' />

        <div class="row mt-5">
          <div class="col-10">
            <h2>Move Information</h2>
          </div>
          <div class="col-2 text-right">
            <a href="javascript:void(0)" @click="navigateToMoveInfoPage()">Edit</a>
          </div>
        </div>
        <ReviewTable :elements='moveInfoTableData' />
      </div>
    </PageContent>
    <ContinueBar @continue='submitForm()'/>
  </div>
</template>

<script>
import PageContent from '../components/PageContent.vue';
import ContinueBar from '../components/ContinueBar.vue';
import ReviewTable from '../components/ReviewTable.vue';
import routes from '../router/routes';
import { scrollTo } from '../helpers/scroll';
import { formatDate } from '../helpers/date';

export default {
  name: 'ReviewPage',
  components: {
    PageContent,
    ContinueBar,
    ReviewTable,
  },
  computed: {
    yourInfoTableData() {
      const items = [];
      items.push({
        label: 'Last name',
        value: this.$store.state.form.lastName,
      });
      items.push({
        label: 'PHN',
        value: this.$store.state.form.phn,
      });
      items.push({
        label: 'Email address',
        value: this.$store.state.form.email,
      });
      items.push({
        label: 'Phone number',
        value: this.$store.state.form.phone,
      });
      return items;
    },
    accountTypeTableData() {
      const items = [];
      return items;
    },
    moveInfoTableData() {
      const items = [];
      items.push({
        label: 'Permanent move from BC',
        value: formatDate(this.$store.state.form.moveFromBCDate),
      });
      items.push({
        label: 'Arrival in new destination',
        value: formatDate(this.$store.state.form.arriveDestinationDate),
      });
      let address = this.$store.state.form.addressLine1;
      if (this.$store.state.form.addressLine2) {
        address += '\n' + this.$store.state.form.addressLine2;
      }
      items.push({
        label: 'New address',
        value: address,
      });
      items.push({
        label: 'Country',
        value: this.$store.state.form.country,
      });
      items.push({
        label: 'State / province / region',
        value: this.$store.state.form.province,
      });
      items.push({
        label: 'City',
        value: this.$store.state.form.city,
      });
      items.push({
        label: 'Zip / postal code',
        value: this.$store.state.form.postalCode,
      });
      return items;
    }
  },
  methods: {
    submitForm() {
      console.log('Submit form.');
    },
    navigateToYourInfoPage() {
      this.$router.push(routes.YOUR_INFO_PAGE.path);
      scrollTo();
    },
    navigateToAccountTypePage() {
      this.$router.push(routes.ACCOUNT_TYPE_PAGE.path);
      scrollTo();
    },
    navigateToMoveInfoPage() {
      this.$router.push(routes.MOVE_INFO_PAGE.path);
      scrollTo();
    }
  }
}
</script>