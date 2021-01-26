import Radio from "./Radio.vue";

export default {
  title: 'Radio',
  component: Radio,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Radio },
  template: '<Radio v-bind="$props" />',
});

export const Basic = Template.bind({});
Basic.args = {
  label: "Yes",
  id: "radio",
  name: "radio"
};
