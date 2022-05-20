<template>
  <div class="form-group bcgov-table-body p-3"
      :style="{'background-color': backgroundColor}">
    <div v-for="element in elements"
        :key="element.label"
        :data-cy="'ReviewTableElement'"
        class="bcgov-row d-flex">
      <div class="bcgov-table-cell label">
        <div class="table-cell-max">{{element.label}}</div>
      </div>
      <div class="bcgov-table-cell value"><b>{{element.value}}</b></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ReviewTable',
  components: {},
  props: {
    elements: Array,
    backgroundColor: {
      type: String,
      default: 'white',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bcgov-table-body {
  display: flex;
  flex-direction: column;
  /* background-color: #EEE; */
  border-top: 1px solid rgba(0,0,0,0.3);
}

.bcgov-row {
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  padding: 5px 8px;
  white-space: pre-wrap;
}

.bcgov-table-cell.label {
  width: 50%;
  text-align: right;
}
.bcgov-table-cell.value {
  width: 50%;
  padding-left: 6px;
}
.table-cell-max {
  max-width: 350px;
  display: inline-block;
}
@media (max-width: 768px) {
  .bcgov-row {
    flex-direction: column;
  }
  .bcgov-table-cell.label {
    width: 100%;
    text-align: left;
  }
  .bcgov-table-cell.value {
    width: 100%;
    padding: 0;
  }
}
</style>
