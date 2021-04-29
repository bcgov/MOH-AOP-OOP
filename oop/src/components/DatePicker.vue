<template>
  <div :class="'date-picker no-select ' + className">
    <div class="title-container">
      <div class="year-arrow left"
          @click="previousYear()">
        <IconChevronDoubleLeft />
      </div>
      <div class="month-arrow left"
          @click="previousMonth()">
        <IconChevronSingleLeft />
      </div>
      <div class="date-label">{{ monthLabel }} {{ year }}</div>
      <div class="month-arrow right"
          @click="nextMonth()">
        <IconChevronSingleRight />
      </div>
      <div class="year-arrow right"
          @click="nextYear()">
        <IconChevronDoubleRight />
      </div>
    </div>
    <div class="date-container">
      <div class="date-header-cell">Su</div>
      <div class="date-header-cell">Mo</div>
      <div class="date-header-cell">Tu</div>
      <div class="date-header-cell">We</div>
      <div class="date-header-cell">Th</div>
      <div class="date-header-cell">Fr</div>
      <div class="date-header-cell">Sa</div>
      <div class="date-cell empty"
          v-for="index in paddedSquares"
          :key="'index' + index"></div>
      <div :class="'date-cell ' +
                  (isSelectedDate(date) ? 'selected ' : '') +
                  (isDateToday(date) ? 'date-today ' : '')"
          v-for="(date, index) in datesInMonth"
          :key="index">
        <div class="circle"
            @click="handleDaySelect(date)">{{date.getDate()}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {
//  startOfDay,
  getDaysInMonth,
  getDay,
  startOfToday,
} from 'date-fns';
import IconChevronDoubleLeft from './IconChevronDoubleLeft.vue';
import IconChevronDoubleRight from './IconChevronDoubleRight.vue';
import IconChevronSingleLeft from './IconChevronSingleLeft.vue';
import IconChevronSingleRight from './IconChevronSingleRight.vue';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export default {
  name: 'DatePicker',
  components: {
    IconChevronDoubleLeft,
    IconChevronDoubleRight,
    IconChevronSingleLeft,
    IconChevronSingleRight,
  },
  props: {
    value: {
      type: Date,
    },
    className: {
      type: String,
      default: '',
    }
  },
  data: () => {
    return {
      year: null,
      month: null,
      day: null,
      dateToday: null,
    };
  },
  created() {
    this.dateToday = startOfToday();
    this.dateToday = new Date(2021, 3, 15);
    
    if (this.value) {
      this.setDateValue(this.value);
    } else {
      this.year = this.dateToday.getFullYear();
      this.month = this.dateToday.getMonth();
      this.day = this.dateToday.getDate();
    }
  },
  computed: {
    datesInMonth() {
      const dates = [];
      const daysInMonth = getDaysInMonth(new Date(this.year, this.month));
      
      for (let i=0; i<daysInMonth; i++) {
        dates.push(new Date(this.year, this.month, i+1));
      }
      return dates;
    },
    paddedSquares() {
      const items = [];
      const weekIndex = getDay(new Date(this.year, this.month));

      for (let i=0; i<weekIndex; i++) {
        items.push(i);
      }
      return items;
    },
    monthLabel() {
      return MONTHS[this.month];
    },
  },
  methods: {
    setDateValue(value) {
      if (value) {
        this.year = value.getFullYear();
        this.month = value.getMonth();
        this.day = value.getDate();      
      }
    },
    handleDaySelect(date) {
      this.$emit('input', date);
      this.$emit('dateSelected', date);
    },
    nextMonth() {
      if (this.month === 11) {
        this.year++;
        this.month = 0;
      } else {
        this.month++;
      }
    },
    previousMonth() {
      if (this.month === 0) {
        this.year--;
        this.month = 11;
      } else {
        this.month--;
      }
    },
    nextYear() {
      this.year++;
    },
    previousYear() {
      this.year--;
    },
    isSelectedDate(date) {
      if (date && this.value
        && this.value.getFullYear() === date.getFullYear()
        && this.value.getMonth() === date.getMonth()
        && this.value.getDate() === date.getDate()) {
        return true;
      }
      return false;
    },
    isDateToday(date) {
      if (date
        && this.dateToday.getFullYear() === date.getFullYear()
        && this.dateToday.getMonth() === date.getMonth()
        && this.dateToday.getDate() === date.getDate()) {
        return true;
      }
      return false;
    },
  },
  watch: {
    value(newValue) {
      this.setDateValue(newValue);
    }
  }
}
</script>

<style scoped>
.date-picker {
  background: #FFF;
  color: #313132;
  border: solid thin #606060;
  border-radius: 4px;
  box-shadow: 0px 0px 20px 0px #CCC;
  width: 320px;
}
.date-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 280px;
  margin: 10px 25px 25px 25px;
}
.date-header-cell {
  text-align: center;
  font-weight: bold;
  padding: 6px;
  width: 38px;
  height: 38px;
  max-width: 38px; /* Needed for IE */
  flex: 0 0 38px;
}
.date-cell {
  text-align: center;
  width: 38px;
  height: 38px;
  max-width: 38px; /* Needed for IE */
  flex: 0 0 38px;
  padding: 2px;
}
.date-cell:not(.empty) .circle {
  cursor: pointer;
}
.title-container {
  display: flex;
  flex-wrap: wrap;
  margin: 12px 18px;
}
.month-arrow {
  flex: 0 0 30px;
  width: 30px;
  height: 40px;
  cursor: pointer;
}
.month-arrow svg {
  width: 20px;
  height: 20px;
  margin: 10px 5px;
}
.month-arrow.left {
  text-align: right;
}
.month-arrow.right {
  text-align: left;
}
.month-arrow.right svg {
  margin: 10px 0 10px 10px;
}
.year-arrow {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.year-arrow svg {
  width: 20px;
  height: 20px;
  margin: 10px;
}
.year-arrow.left {
}
.year-arrow.right {
  text-align: right;
}
.date-label {
  width: 142px;
  flex: 0 0 142px;
  margin-top: 8px;
  text-align: center;
  font-weight: bold;
}
.date-cell .circle {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 2px 0;
  margin: 5px;
}
.date-cell.selected .circle {
  color: #FFF;
  background: #036;
}
.date-cell.date-today .circle {
  border: solid thin #154373;
}
.date-cell .circle:hover {
  background: #b3c2d2;
  color: #000;
}
.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>