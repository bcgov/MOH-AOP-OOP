<template>
  <table-component :elements="tableTestData" />
</template>

<script>
  import Table from "../components/table/Table.vue";
  import { getTableElementsTestData } from "./tableTestData";

  export default {
    name: "DisplayBoxTestData",
    components: {
      "table-component": Table,
    },
    data() {
      return {
        tableTestData: getTableElementsTestData(),
      }
    }
  }
</script>
