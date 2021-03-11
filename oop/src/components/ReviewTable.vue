<template>
  <div class="form-group bcgov-table-body">
    <div v-for="element in elements"
        :key="element.label"
        class="bcgov-row">
      <div class="bcgov-table-cell label"><b>{{element.label}}</b></div>
      <div class="bcgov-table-cell value">{{element.value}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Table',
  components: {},
  props: {
    elements: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bcgov-table-body {
  display: flex;
  flex-direction: column;
  background-color: #EEE;
  border-top: 1px solid rgba(0,0,0,0.3);
}

.bcgov-row {
  display: flex;
  flex-direction: row;
  vertical-align: top;
  padding: 3px 8px;
  white-space: pre-wrap;
}

.bcgov-table-cell.label {
  width: 40%;
}
.bcgov-table-cell.value {
  width: 60%;
  padding-left: 6px;
}

</style>
