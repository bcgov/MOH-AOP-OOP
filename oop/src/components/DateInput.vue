<template>
  <div :class='className'>
    <fieldset>
      <legend class="date--legend">{{label}}:</legend>
      <div class="date-row">
        <label for="monthSelect">Month:</label>
        <select id="monthSelect"
                class="form-control monthSelect"
                v-model="month"
                @blur="onBlurMonth($event.target.value)"
                :disabled='disabled'>
          <!-- We show the blank option so the user can clear out their data.-->
          <option value="null" label="Month" selected></option>
          <option v-for="(month, index) in monthList" :key="index" :value="index">{{month}}</option>
        </select>

        <label for="dayInput">Day:</label>
        <input id="dayInput"
              type="number"
              class="form-control dayInput"
              placeholder="Day"
              v-model="day"
              @blur="onBlurDay($event.target.value)"
              :disabled='disabled'
              maxlength="2"
              autocomplete="off"/>

        <label for="yearInput">Year:</label>
        <input id="yearInput"
              type="number"
              class="form-control yearInput"
              placeholder="Year"
              v-model="year"
              @blur="onBlurYear($event.target.value)"
              :disabled='disabled'
              maxlength="4"
              autocomplete="off"/>
      </div>
    </fieldset>
  </div>
</template>

<script>
import {
  startOfDay,
  addYears,
  subYears,
  startOfToday,
  isAfter,
  isBefore,
  getDaysInMonth,
  isSameDay,
} from 'date-fns';

const MAX_YEAR_RANGE = 150;

export const distantFutureValidator = (date) => {
  const distantFuture = addYears(startOfToday(), MAX_YEAR_RANGE);
  return isBefore(date, distantFuture);
};

export const distantPastValidator = (date) => {
  const distantPast = subYears(startOfToday(), MAX_YEAR_RANGE);
  return isAfter(date, distantPast);
};

export const beforeDateValidator = (compareDateName) => {
  return (date, vm) => {
    const dateToCompare = vm[compareDateName];
    return isBefore(date, dateToCompare);
  };
};

export const afterDateValidator = (compareDateName) => {
  return (date, vm) => {
    const dateToCompare = vm[compareDateName];
    return isAfter(date, dateToCompare);
  };
};

export const sameDateValidator = (date, dateToCompare) => {
  console.log(date);
  console.log(dateToCompare);
  return isSameDay(date, dateToCompare);
};

export default {
  name: 'DateInput',
  components: {},
  props: {
    value: Date,
    className: String,
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Date'
    }
  },
  data() {
    return {
      month: null,
      day: null,
      year: null,
      monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    }
  },
  created() {
    if (this.value) {
      this.day = this.value.getDate().toString();
      this.month = this.value.getMonth().toString();
      this.year = this.value.getFullYear().toString();
    }
  },
  methods: {
    processDate() {
      if (this.canCreateDate()) {
        const year = this.getNumericValue(this.year);
        const month = this.getNumericValue(this.month);
        const day = this.getNumericValue(this.day);

        // Date function appears to use setYear() so any year 0-99 results in year 1900 to 1999
        // Set each field individually, use setFullYear() instead of setYear()
        // Set time on date to 00:00:00 for comparing later
        this.date = startOfDay(new Date(year, month, day));
        this.date.setFullYear(year);

      } else {
        // Trigger validator for emptying fields use case. This is to remove the 'Invalid date' error.
        if (this.date ||
          (!this.year && !this.day && this.month === 'null')) {

          // Destroys the internal Date object.
          this.date = null;
        }
      }
      this.$emit('input', this.date);
    },
    canCreateDate() {
      // special because "0" is valid (Jan)
      const isMonthValid = (typeof this.month === 'string' && this.month !== 'null')
        || typeof this.month === 'number';

      const day = parseInt(this.day);
      const daysInMonth = getDaysInMonth(new Date(this.year, this.month, 2));
      const isDateValid = day <= daysInMonth;

      if (!!this.year && !!this.day && isMonthValid && isDateValid) {
        return true;
      }
      return false;
    },
    getNumericValue(value) {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? null : parsed;
    },
    onBlurDay(value) {
      this.day = value;
      this.processDate();
    },
    onBlurYear(value) {
      this.year = value;
      this.processDate();
    },
    onBlurMonth(value) {
      this.month = value;
      this.processDate();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
legend {
  font-size: 1rem;
}
.date-row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
label {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.monthSelect {
  max-width: 50%;
  margin-right: 1em;
}
.dayInput {
  max-width: 25%;
  margin-right: 1em;
}
.yearInput {
  max-width: 25%;
}
</style>
