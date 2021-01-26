import Button from "./Button.vue";

export default {
  title: 'Button',
  component: Button,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = {
  label: "Submit",
  styling: "bcgov-normal-blue btn",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Cancel",
  styling: "bcgov-normal-white btn",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled",
  styling: "bcgov-normal-blue btn",
  disabled: true,
};

export const HasLoader = Template.bind({});
HasLoader.args = {
  label: "Has Loader",
  styling: "bcgov-normal-blue btn",
  hasLoader: true,
  disabled: true,
};
