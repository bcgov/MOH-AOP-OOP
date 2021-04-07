<template>
  <div :class="className">
    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2">Your information</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToYourInfoPage()">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='yourInfoTableData'
                :backgroundColor='tableBackgroundColor'/>

    <div class="row align-items-end mt-5">
      <div class="col-9">
        <h2 class="mb-2">Account type</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToAccountTypePage()">Edit
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='accountTypeTableData'
                :backgroundColor='tableBackgroundColor' />

    <div class="row align-items-end mt-5">
      <div class="col-9">
        <h2 class="mb-2">Move information</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToMoveInfoPage()">Edit
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='moveInfoTableData'
                :backgroundColor='tableBackgroundColor' />
  </div>
</template>

<script>
import ReviewTable from './ReviewTable.vue';
import routes from '../router/routes';
import { scrollTo } from '../helpers/scroll';
import { formatDate } from '../helpers/date';
import pageStateService from '../services/page-state-service';

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
    },
    tableBackgroundColor: {
      type: String,
    }
  },
  computed: {
    yourInfoTableData() {
      const items = [];
      items.push({
        label: 'Last name:',
        value: this.$store.state.form.lastName,
      });
      items.push({
        label: 'Personal health number (PHN):',
        value: this.$store.state.form.phn,
      });
      items.push({
        label: 'Email address:',
        value: this.$store.state.form.email,
      });
      items.push({
        label: 'Phone number:',
        value: this.$store.state.form.phone,
      });
      return items;
    },
    accountTypeTableData() {
      const items = [];
      items.push({
        label: 'Are you the account holder or a dependent?',
        value: this.$store.state.form.accountType === 'AH' ? 'I\'m the account holder' : 'I\'m a dependent'
      });
      if (this.$store.state.form.accountType === 'AH') {
        items.push({
          label: 'Who is moving out of B.C.?',
          value: this.whoIsMoving
        });
        if (this.$store.state.form.personMoving === 'AH_DEP' || this.$store.state.form.personMoving === 'DEP_ONLY') {
          items.push({
            label: 'Are all of the dependents on your MSP account moving out of B.C.?',
            value: this.$store.state.form.isAllDependentsMoving === 'Y' ? 'Yes' : 'No',
          });
          if (this.$store.state.form.isAllDependentsMoving === 'N') {
            items.push({
              label: 'Dependent PHN(s):',
              value: this.dependentPhns,
            });
          }
        }
      }
      return items;
    },
    moveInfoTableData() {
      const items = [];
      items.push({
        label: 'Permanent move from B.C.:',
        value: formatDate(this.$store.state.form.moveFromBCDate),
      });
      items.push({
        label: 'Arrival in new destination:',
        value: formatDate(this.$store.state.form.arriveDestinationDate),
      });
      const addressLines = this.$store.state.form.addressLines;
      for (let i=0; i<addressLines.length; i++) {
        items.push({
          label: 'Address line ' + (i+1) + ':',
          value: addressLines[i] == null ? '' : addressLines[i].value,
        });
      }
      items.push({
        label: 'Country:',
        value: this.$store.state.form.country,
      });
      const provinceLabel = this.$store.state.form.country === 'Canada' ? 'Province:' : 'Province/state/region:'
      items.push({
        label: provinceLabel,
        value: this.$store.state.form.province,
      });
      const cityLabel = this.$store.state.form.country === 'Canada' ? 'City:' : 'City/town:'
      items.push({
        label: cityLabel,
        value: this.$store.state.form.city,
      });
      const postalCodeLabel = this.$store.state.form.country === 'Canada' ? 'Postal code:' : 'Postal code/zip code:'
      items.push({
        label: postalCodeLabel,
        value: this.$store.state.form.postalCode,
      });
      return items;
    },
    whoIsMoving() {
      switch(this.$store.state.form.personMoving) {
        case 'AH_ONLY':
          return 'Account holder only';
        case 'AH_DEP':
          return 'Account holder and dependent(s)';
        case 'DEP_ONLY':
          return 'Dependent(s) only';
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
    },
    addressLines() {
      const addressLines = this.$store.state.form.addressLines;
      let result = '';

      for (let i=0; i<addressLines.length; i++) {
        if (addressLines[i].value && addressLines[i].value !== '') {
          result += addressLines[i].value + '\n';
        }
      }
      return result;
    }
  },
  methods: {
    navigateToYourInfoPage() {
      const toPath = routes.YOUR_INFO_PAGE.path;
      pageStateService.setPageComplete(toPath);
      this.$router.push(toPath);
      scrollTo();
    },
    navigateToAccountTypePage() {
      const toPath = routes.ACCOUNT_TYPE_PAGE.path;
      pageStateService.setPageComplete(toPath);
      this.$router.push(toPath);
      scrollTo();
    },
    navigateToMoveInfoPage() {
      const toPath = routes.MOVE_INFO_PAGE.path;
      pageStateService.setPageComplete(toPath);
      this.$router.push(toPath);
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
