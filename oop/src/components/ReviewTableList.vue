<template>
  <div :class="className">
    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2">Your Information</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToYourInfoPage()">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='yourInfoTableData' />

    <div class="row align-items-end mt-5">
      <div class="col-9">
        <h2 class="mb-2">Account Type</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToAccountTypePage()">Edit
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='accountTypeTableData' />

    <div class="row align-items-end mt-5">
      <div class="col-9">
        <h2 class="mb-2">Move Information</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMoveInfoPage()">Edit
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='moveInfoTableData' />
  </div>
</template>

<script>
import ReviewTable from './ReviewTable.vue';
import routes from '../router/routes';
import { scrollTo } from '../helpers/scroll';
import { formatDate } from '../helpers/date';

export default {
  name: 'ReviewTableList',
  components: {
    ReviewTable,
  },
  props: {
    showEditButtons: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    }
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
      items.push({
        label: 'Who is moving?',
        value: this.whoIsMoving
      });
      if (this.$store.state.form.accountType === 'AH'
        && (this.$store.state.form.personMoving === 'AH_DEP' || this.$store.state.form.personMoving === 'DEP_ONLY')) {
        items.push({
          label: 'Are all dependents moving?',
          value: this.$store.state.form.isAllDependentsMoving === 'Y' ? 'Yes' : 'No',
        });
        if (this.$store.state.form.isAllDependentsMoving === 'N') {
          items.push({
            label: 'Dependent PHN(s)',
            value: this.dependentPhns,
          });
        }
      }
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
    },
    whoIsMoving() {
      if (this.$store.state.form.accountType === 'AH') {
        switch(this.$store.state.form.personMoving) {
          case 'AH_ONLY':
            return 'Account Holder only';
          case 'AH_DEP':
            return 'Account Holder and Dependent(s)';
          case 'DEP_ONLY':
            return 'Dependent(s) only';
        }
      } else if (this.$store.state.form.accountType === 'DEP') {
        return 'Dependent';
      }
      return null;
    },
    dependentPhns() {
      const phns = this.$store.state.form.dependentPhns;
      let result = '';

      for (let i=0; i<phns.length; i++) {
        if (phns[i].value && phns[i].value !== '') {
          result += phns[i].value + '\n';
        }
      }
      return result.trim();
    }
  },
  methods: {
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

<style scoped>
a {
  text-decoration: none;
}
</style>
