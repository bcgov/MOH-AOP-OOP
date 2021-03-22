<template>
  <div :class='className'>
    <fieldset>
      <legend class="date--legend">{{label}}</legend>
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

        <label v-bind:for="'dayInput' + label">Day:</label>
        <input 
            :id="'dayInput' + label"
            class="form-control dayInput"
            placeholder="DD"
            v-model="day"
            @blur="onBlurDay($event.target.value)"
            :disabled='disabled'
            maxlength="2"
            v-on:keypress="isNumber($event)"/>

        <label v-bind:for="'yearInput' + label">Year:</label>
        <input 
            :id="'yearInput' + label"
            class="form-control yearInput"
            placeholder="YYYY"
            v-model="year"
            @blur="onBlurYear($event.target.value)"
            :disabled='disabled'
            maxlength="4"
            v-on:keypress="isNumber($event)"/>
        <div class="date-picker-icon"
            @click="openCloseDatePicker($event)">
          <font-awesome-icon icon="calendar-alt" />
        </div>
        <div class="date-picker-container"
            ref="datePicker">
          <div class="date-picker">
            <DatePicker v-if="isDatePickerOpen"
                        v-model="datePickerDate"
                        @dateSelected="closeDatePicker()" />
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import DatePicker from './DatePicker.vue';
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
    return (dateToCompare == null || isSameDay(date, dateToCompare) == true) ? true : isBefore(date, dateToCompare);
  };
};

export const afterDateValidator = (compareDateName) => {
  return (date, vm) => {
    const dateToCompare = vm[compareDateName];
    return (dateToCompare == null || isSameDay(date, dateToCompare) == true) ? true : isAfter(date, dateToCompare);
  };
};

export default {
  name: 'DateInput',
  components: {
    DatePicker,
  },
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
      isDatePickerOpen: false,
      datePickerDate: null,
    }
  },
  created() {
    if (this.value) {
      this.day = this.value.getDate().toString();
      this.month = this.value.getMonth().toString();
      this.year = this.value.getFullYear().toString();
      this.datePickerDate = this.value;
    }
  },
  mounted() {
    window.addEventListener('close-date-picker', this.closeDatePicker);
    window.addEventListener('click', this.closeDatePicker);
    this.$refs.datePicker.addEventListener('click', this.stopPropagation);
  },
  beforeUnmount() {
    window.removeEventListener('close-date-picker', this.closeDatePicker);
    window.removeEventListener('click', this.closeDatePicker);
    this.$refs.datePicker.removeEventListener('click', this.stopPropagation);
  },
  methods: {
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
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
      this.datePickerDate = this.date;
      this.$emit('input', this.date);
    },
    canCreateDate() {
      // special because "0" is valid (Jan)
      const isMonthValid = (typeof this.month === 'string' && this.month !== 'null')
        || typeof this.month === 'number';

      const day = parseInt(this.day);
      // If the user puts '0' as the day, return invalid
      if (day === 0){
        return false;
      }
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
    },
    openCloseDatePicker(event) {
      event.stopPropagation();
      if (this.isDatePickerOpen) {
        this.closeDatePicker();
      } else {
        let closeEvent;
        if (typeof(Event) === 'function') {
          closeEvent = new Event('close-date-picker');
        } else {
          // For IE event dispatching.
          closeEvent = document.createEvent('Event');
          closeEvent.initEvent('close-date-picker', true, true);
        }
        // Close existing date pickers.
        window.dispatchEvent(closeEvent);
        // Open component date picker.
        this.isDatePickerOpen = true;
      }
    },
    closeDatePicker() {
      this.isDatePickerOpen = false;
    },
    stopPropagation(event) {
      event.stopPropagation();
    },
  },
  watch: {
    datePickerDate(newDate) {
      this.date = newDate;

      if (this.date) {
        this.day = this.date.getDate().toString();
        this.month = this.date.getMonth().toString();
        this.year = this.date.getFullYear().toString();
      }
      this.$emit('input', this.date);
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
  width: 160px;
  max-width: auto;
  margin-right: 1em;
}
.dayInput {
  width: 50px;
  margin-right: 1em;
}
.yearInput {
  width: 65px;
  margin-right: 1em;
}
.date-picker-icon {
  width: 32px;
  height: 39px;
  font-size: 26px;
  cursor: pointer;
}
.date-picker-container {
  position: relative;
}
.date-picker {
  position: absolute;
  top: 18px;
  right: 0;
  z-index: 1;
}
</style>
