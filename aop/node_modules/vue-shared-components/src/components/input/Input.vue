<template>
  <div>
    <label v-if="label" v-bind:for="id" class="bcgov-label">
      <div class="bcgov-input-label">{{ label }}</div>
      <span v-if="isRequired" id="asterisk" class="bcgov-mandatory">*</span>&nbsp;
      <span class="bcgov-note">{{ note }}</span>
    </label>
    <input
      v-bind:class="styling"
      type="text"
      v-bind:id="id"
      v-bind:value="value"
      v-bind:placeholder="placeholder"
      v-bind:readOnly="isReadOnly"
      @change="$emit('input-change')"
    />
    <br />
    <span class="bcgov-error">{{ errorMsg }}</span>
  </div>
</template>

<script>
  import "./Input.css";

  export default {
    name: "Input",
    props: {
      label: {
        type: String,
        required: false,
        default: "",
      },
      id: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: false,
        default: "",
      },
      placeholder: {
        type: String,
        required: false,
        default: "",
      },
      isRequired: {
        type: Boolean,
        required: true,
      },
      errorMsg: {
        type: String,
        required: false,
        default: "",
      },
      styling: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: false,
        default: "",
      },
      isReadOnly: {
        type: Boolean,
        required: false,
        default: false,
      },
    }
  }
</script>
