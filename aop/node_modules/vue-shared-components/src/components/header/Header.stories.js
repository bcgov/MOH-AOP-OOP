import { createMemoryHistory } from "history";
import Header from "./Header.vue";

export default {
  title: 'Header',
  component: Header,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Header },
  template: '<Header v-bind="$props" />',
});

export const Basic = Template.bind({});
Basic.args = {
  history: createMemoryHistory(),
  name: "Heading",
};
