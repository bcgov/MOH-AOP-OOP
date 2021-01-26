<template>
  <display-box v-bind:styling="styling">
    <template v-slot:icon>
      <generate-icon v-bind:iconType="alertType" v-bind:icon="icon" />
    </template>
    <template v-slot:element>
      {{ element }}
    </template>
  </display-box>
</template>

<script>
  import DisplayBox from "../display-box/DisplayBox.vue";
  import GenerateIcon from "./GenerateIcon";
  import "./Alert.css";

  export default {
    name: "Alert",
    components: {
      "display-box": DisplayBox,
      "generate-icon": GenerateIcon,
    },
    props: {
      alertType: {
        type: String,
        required: true,
      },
      styling: {
        type: String,
        required: true,
      },
      element: {
        type: [Object, String],
        required: true,
      },
      icon: {
        type: Object,
        required: true,
      },
    }
  }
</script>
