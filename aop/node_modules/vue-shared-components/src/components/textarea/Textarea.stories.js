import Textarea from "./Textarea.vue";

export default {
  title: 'Textarea',
  component: Textarea,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Textarea },
  template: '<Textarea v-bind="$props" />',
});

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Can you provide more detail?",
  id: "1"
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  id: "1"
};

export const Mandatory = Template.bind({});
Mandatory.args = {
  id: "1",
  label: "You must provide more information",
  isRequired: true,
};
