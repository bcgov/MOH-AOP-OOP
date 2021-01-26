<template>
  <div v-bind:class="rowStyling">
    <div v-if="isNameBold" v-bind:class="columnStyle">
      <b>{{ name }}</b>
    </div>
    <div v-if="!isNameBold" v-bind:class="columnStyle">{{ name }}</div>
    <div v-if="isValueBold" class="bcgov-table-value" v-bind:class="rightAlign">
      <b>{{ value }}</b>
    </div>
    <div v-if="!isValueBold" class="bcgov-table-value" v-bind:class="rightAlign">{{ value }}</div>
  </div>
</template>

<script>
  export default {
    name: "TableElement",
    props: {
      element: {
        type: Object,
        required: true,
      },
      isFeesData: {
        type: Boolean,
        required: true,
      },
      elementStyles: {
        type: Object,
        required: true,
      },
    },
    data() {
      const { name, value, isValueBold, isNameBold, isEmptyRow } = this.element;
      const emptyRow = isEmptyRow ? "bcgov-empty-row" : "";
      const rightAlign = this.isFeesData ? "bcgov-right-align" : "";
      let rowStyle = this.isFeesData ? "bcgov-row-fees" : "bcgov-row";
      let columnStyle = "bcgov-fill-width";
      if (this.elementStyles) {
        if (this.elementStyles.rowStyle) rowStyle += ` ${this.elementStyles.rowStyle}`;
        if (this.elementStyles.columnStyle)
          columnStyle = this.elementStyles && this.elementStyles.columnStyle;
      }

      return {
        emptyRow,
        rightAlign,
        rowStyling: `${rowStyle} ${emptyRow}`,
        columnStyle,
        name,
        value,
        isValueBold,
        isNameBold
      }
    }
  }
</script>
