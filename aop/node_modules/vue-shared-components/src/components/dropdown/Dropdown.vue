<template>
  <div class="bcgov-form">
    <label v-if="label" class="bcgov-dropdown-label" for="dropdown">
      {{ label }}
    </label>
    <div class="bcgov-dropdown-wrapper">
      <chevron-down class="fa-chevron-down" />
      <select
        class="bcgov-dropdown"
        name="options"
        id="dropdown"
        @change="$emit('select-dropdown-value')"
      >
        <option v-bind:key="item" v-for="item in items">
          {{ item }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  import "./Dropdown.css";
  import ChevronDown from 'mdi-vue/ChevronDown.vue';

  export default {
    name: "Dropdown",
    props: {
      items: {
        type: Array,
        required: true,
      },
      label: {
        type: String,
        required: false,
      },
    },
    components: {
      "chevron-down": ChevronDown,
    }
  }
</script>
