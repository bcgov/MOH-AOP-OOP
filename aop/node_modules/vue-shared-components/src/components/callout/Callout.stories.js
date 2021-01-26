import Callout from "./Callout.vue";

export default {
  title: 'Callout',
  component: Callout,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Callout },
  template: '<Callout v-bind="$props" />',
});

export const WithText = Template.bind({});
WithText.args = {
  text: "This is the callout text",
};

export const WithCheckbox = Template.bind({});
WithCheckbox.args = {
  text: "This is the callout text",
  checkboxLabel: "I agree",
};
