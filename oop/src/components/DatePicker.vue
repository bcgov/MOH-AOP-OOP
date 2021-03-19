<template>
  <div :class="'date-picker no-select ' + className">
    <div class="title-container">
      <div class="arrow left"
          @click="previousMonth()">
        <font-awesome-icon icon="arrow-left" />
      </div>
      <div class="date-label">{{ monthLabel }} {{ year }}</div>
      <div class="arrow right"
          @click="nextMonth()">
        <font-awesome-icon icon="arrow-right" />
      </div>
    </div>
    <div class="date-container">
      <div class="date-header-cell">S</div>
      <div class="date-header-cell">M</div>
      <div class="date-header-cell">T</div>
      <div class="date-header-cell">W</div>
      <div class="date-header-cell">T</div>
      <div class="date-header-cell">F</div>
      <div class="date-header-cell">S</div>
      <div class="date-cell empty"
          v-for="index in paddedSquares"
          :key="'index' + index"></div>
      <div :class="'date-cell ' + (isSelectedDate(date) ? 'selected' : '')"
          v-for="(date, index) in datesInMonth"
          :key="index"
          @click="handleDaySelect(date)">
        <div class="circle">{{date.getDate()}}</div>
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
    };
  },
  created() {
    if (this.value) {
      this.setDateValue(this.value);
    } else {
      const dateToday = startOfToday();
      this.year = dateToday.getFullYear();
      this.month = dateToday.getMonth();
      this.day = dateToday.getDate();
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
    isSelectedDate(date) {
      if (date
        && this.year === date.getFullYear()
        && this.month === date.getMonth()
        && this.day === date.getDate()) {
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
  border: solid thin #CCC;
  border-radius: 5px;
  box-shadow: 0px 0px 20px 0px #CCC;
}
.date-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 280px;
}
.date-header-cell {
  text-align: center;
  font-weight: bold;
  padding: 7px;
  width: 40px;
  height: 40px;
  max-width: 40px; /* Needed for IE */
  flex: 0 0 40px;
}
.date-cell {
  text-align: center;
  width: 40px;
  height: 40px;
  max-width: 40px; /* Needed for IE */
  flex: 0 0 40px;
  padding: 2px;
}
.date-cell:not(.empty) {
  cursor: pointer;
}
.title-container {
  display: flex;
  flex-wrap: wrap;
}
.arrow {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  font-size: 28px;
  cursor: pointer;
}
.arrow.left {
  padding-left: 5px;
}
.arrow.right {
  text-align: right;
  padding-right: 5px;
}
.date-label {
  width: 200px;
  flex: 0 0 200px;
  padding-top: 10px;
  text-align:center;
  font-weight: bold;
}
.date-cell .circle {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  padding: 5px 0;
}
.date-cell.selected .circle {
  background: #BBB;
}
.date-cell:hover .circle {
  color: #FFF;
  background: #036;
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