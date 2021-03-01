<template>
  <div class="form-group bcgov-table-body">
    <div v-for="element in elements" :key="element.name" class="bcgov-row">
      <div class="bcgov-table-cell">
        <strong>{{ element.name }}</strong>
      </div>
      <div class="bcgov-table-cell">{{ element.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  components: {},
  props: {
    elements: Array
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bcgov-table-body {
  display: flex;
  flex-direction: column;
  background-color: #eee;
}

.bcgov-row {
  display: flex;
  flex-direction: row;
  vertical-align: top;
  padding-bottom: 3px;
  padding-top: 3px;
  padding-right: 3px;
  white-space: pre-wrap;
}

.bcgov-table-cell {
  width: 50%;
  padding: 0 8px;
  overflow-wrap: break-word;
}

.bcgov-table-cell:first-child {
  text-align: right;
}
</style>
