<template>
  <label class="bcgov-radio" :for="id">
    {{ label }}
    <input
      type="radio"
      :name="name"
      :id="id"
      @change="$emit('radio-select')"
    />
    <span class="bcgov-dot" />
  </label>
</template>

<script>
  import "./Radio.css";

  export default {
    name: "Radio",
    props: {
      label: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  }
</script>
