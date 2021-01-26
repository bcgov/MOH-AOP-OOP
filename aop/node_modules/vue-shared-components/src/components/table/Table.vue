<template>
  <div class="bcgov-table" v-bind:class="styling">
    <b v-if="heading">{{ heading }}</b>
    <div class="bcgov-table-body">
      <table-element
        v-for="element in elements"
        v-bind:key="element.name || element.key"
        v-bind:isFeesData="isFeesData"
        v-bind:element="element"
        v-bind:elementStyles="elementStyles"
      />
    </div>
  </div>
</template>

<script>
  import TableElement from "./TableElement.vue";
  import "./Table.css";

  export default {
    name: "Table",
    props: {
      heading: {
        type: String,
        required: false,
        default: "",
      },
      elements: {
        type: Array,
        required: false,
        default() {
          return []
        },
      },
      styling: {
        type: String,
        required: false,
        default: "",
      },
      isFeesData: {
        type: Boolean,
        required: false,
        default: false,
      },
      elementStyles: {
        type: Object,
        required: false,
        default() {
          return {}
        },
      }
    },
    components: {
      "table-element": TableElement,
    }
  }
</script>
