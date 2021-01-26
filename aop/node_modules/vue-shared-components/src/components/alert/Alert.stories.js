import Alert from "./Alert.vue";
import CheckboxMarked from "mdi-vue/CheckboxMarked.vue";
import AlertCircle from "mdi-vue/AlertCircle.vue";
import CloseCircle from "mdi-vue/CloseCircle.vue";
import Information from "mdi-vue/Information.vue";

export default {
  title: 'Alert',
  component: Alert,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Alert },
  template: '<Alert v-bind="$props"></Alert>',
});

export const Success = Template.bind({});
Success.args = {
  styling: "bcgov-success-background",
  element: "This is a success message!",
  alertType: "success",
  icon: CheckboxMarked,
};

export const Warning = Template.bind({});
Warning.args = {
  styling: "bcgov-warning-background",
  element: "This is a warning message!",
  alertType: "warning",
  icon: AlertCircle,
};

export const Error = Template.bind({});
Error.args = {
  styling: "bcgov-error-background",
  element: "This is an error message!",
  alertType: "error",
  icon: CloseCircle,
};

export const Info = Template.bind({});
Info.args = {
  styling: "bcgov-info-background",
  element: "This is an info message!",
  alertType: "info",
  icon: Information,
};
