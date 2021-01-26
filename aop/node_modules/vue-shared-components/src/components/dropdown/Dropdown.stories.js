import Dropdown from "./Dropdown.vue";

export default {
  title: 'Dropdown',
  component: Dropdown,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Dropdown },
  template: '<Dropdown v-bind="$props" />',
});

export const PreSelectedOption = Template.bind({});
PreSelectedOption.args = {
  label: "My dropdown",
  items: ["Item 1", "Item 2", "Item 3"],
};

export const NoPreSelectedOption = Template.bind({});
NoPreSelectedOption.args = {
  label: "My dropdown",
  items: ["Select an option", "Item 1", "Item 2"],
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  items: ["Item 1", "Item 2", "Item 3"],
};
