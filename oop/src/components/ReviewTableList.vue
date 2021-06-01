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

    <div v-if="this.$store.state.form.accountType === 'AH'">
      <div class="row align-items-end mt-5">
        <div class="col-9">
          <h2 class="mb-2">Who is moving</h2>
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
    </div>

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
import { getProvinceNameFromCode } from './ProvinceInput.vue';

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
        label: 'Phone number:',
        value: this.$store.state.form.phone,
      });
      return items;
    },
    accountTypeTableData() {
      const items = [];
      items.push({
        label: 'Who is moving out of B.C.?',
        value: this.whoIsMoving
      });
      if (this.$store.state.form.personMoving === 'AH_DEP') {
        items.push({
          label: 'Are all of the dependents on your MSP account moving out of B.C.?',
          value: this.$store.state.form.isAllDependentsMoving === 'Y' ? 'Yes' : 'No',
        });
      }
      if (this.$store.state.form.personMoving === 'DEP_ONLY' || this.$store.state.form.isAllDependentsMoving === 'N') {
        items.push({
          label: 'Dependent PHN(s):',
          value: this.dependentPhns,
        });
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
      items.push({
        label: 'Do you know your new address?',
        value: this.$store.state.form.isNewAddressKnown === 'Y' ? 'Yes' : 'No',
      });
      items.push({
        label: 'Country:',
        value: this.$store.state.form.country,
      });
      if (this.$store.state.form.country === 'Canada') {
        const addressLines = this.$store.state.form.addressLines;
        for (let i=0; i<addressLines.length; i++) {
          if (addressLines[i].value !== null){
            items.push({
              label: 'Address line ' + (i+1) + ':',
              value: addressLines[i].value,
            });
          }
        }
        if (this.$store.state.form.isNewAddressKnown === 'Y'){
          const provinceLabel = 'Province:';
          items.push({
            label: provinceLabel,
            value: getProvinceNameFromCode(this.$store.state.form.province),
          });
        }
        if (this.$store.state.form.city !== null){
          const cityLabel = 'City:';
          items.push({
            label: cityLabel,
            value: this.$store.state.form.city,
          });
        }
        if (this.$store.state.form.postalCode !== null){
          const postalCodeLabel = 'Postal code:';
          items.push({
            label: postalCodeLabel,
            value: this.$store.state.form.postalCode,
          });
        }
      }
      else {
        const addressLines = this.$store.state.form.addressLines;
        if (addressLines[0] && addressLines[0].value !== null){
          items.push({
            label: 'Street address:',
            value: addressLines[0].value,
          });
        }
        if (addressLines[1] && addressLines[1].value !== null){
          items.push({
            label: this.$store.state.form.country === 'United States' ? 'City:' : 'City, Province:',
            value: addressLines[1].value,
          });
          if (this.$store.state.form.country === 'United States' && this.$store.state.form.province !== null){
            items.push({
              label: 'State:',
              value: this.$store.state.form.province,
            });
          }
        }
        if (addressLines[2] && addressLines[2].value !== null){
          items.push({
            label: 'Zip code (optional):',
            value: addressLines[2].value,
          });
        }
        if (this.$store.state.form.city !== null){
          items.push({
            label: 'Postal code/zip code:',
            value: this.$store.state.form.city,
          });
        }
      }
      
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
