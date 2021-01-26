import Input from "./Input.vue";

export default {
  title: 'Input',
  component: Input,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Input },
  template: '<Input v-bind="$props" />',
});

const basicInput = {
  label: "Label Heading",
  id: "textInputId",
  placeholder: "Enter value",
  isRequired: false,
};

export const EditableWhiteMandatory = Template.bind({});
EditableWhiteMandatory.args = {
  ...basicInput,
  styling: "bcgov-editable-white",
  isRequired: true,
};

export const EditableWhiteWithLabel = Template.bind({});
EditableWhiteWithLabel.args = {
  ...basicInput,
  styling: "bcgov-editable-white",
};

export const EditableWhiteNoLabel = Template.bind({});
EditableWhiteNoLabel.args = {
  ...basicInput,
  styling: "bcgov-editable-white",
  label: "",
};

export const NonEditableGrey = Template.bind({});
NonEditableGrey.args = {
  ...basicInput,
  styling: "bcgov-non-editable-grey",
  isReadOnly: true,
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  ...basicInput,
  styling: "bcgov-editable-white",
  errorMsg: "There is an error.",
  value: "some wrong value",
};
