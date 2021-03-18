<template>
  <div :class="'date-picker ' + className">
    <div class="date-header-row">
      <div class="date-header-cell text-center">Su</div>
      <div class="date-header-cell text-center">Mo</div>
      <div class="date-header-cell text-center">Tu</div>
      <div class="date-header-cell text-center">We</div>
      <div class="date-header-cell text-center">Th</div>
      <div class="date-header-cell text-center">Fr</div>
      <div class="date-header-cell text-center">Sa</div>
    </div>
  </div>
</template>
<script>
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
  }
}
</script>

<style>
.date-picker {
  background: #FFF;
  /* max-width: 200px; */
  border: solid thin #CCC;
  border-radius: 5px;
}
.date-header-row {
  display: flex;
  flex-wrap: wrap;
  border-bottom: solid thin #CCC;
}
.date-header-cell {
  padding: 7px;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
}
</style>