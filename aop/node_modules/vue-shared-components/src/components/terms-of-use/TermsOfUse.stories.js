import TermsOfUse from "./TermsOfUse.vue";
import TermsOfUseTestData from "../../modules/TermsOfUseTestData.vue";

export default {
  title: 'TermsOfUse',
  component: TermsOfUse,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TermsOfUse },
  template: '<TermsOfUse v-bind="$props" />',
});

export const Basic = Template.bind({});
Basic.args = {
  content: TermsOfUseTestData,
  heading: "Terms of Use",
  confirmText: "I accept these terms and conditions"
};
