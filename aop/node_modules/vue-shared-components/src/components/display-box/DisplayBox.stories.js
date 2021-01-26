import DisplayBox from "./DisplayBox.vue";
import DisplayBoxTestData from "../../modules/DisplayBoxTestData.vue";
import Account from 'mdi-vue/Account.vue';

export default {
  title: 'DisplayBox',
  component: DisplayBox,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DisplayBox, DisplayBoxTestData },
  template: '<DisplayBox v-bind="$props"><template v-slot:element><DisplayBoxTestData /></template></DisplayBox>',
});

export const WithoutIcon = Template.bind({});

const WithIconTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DisplayBox, Account, DisplayBoxTestData },
  template: '<DisplayBox v-bind="$props"><template v-slot:element><DisplayBoxTestData /></template><template v-slot:icon><Account /></template></DisplayBox>',
});

export const WithIcon = WithIconTemplate.bind({});

export const WithBlueBackground = WithIconTemplate.bind({});
WithBlueBackground.args = {
  styling: "bcgov-blue-background",
};

export const WithBorder = WithIconTemplate.bind({});
WithBorder.args = {
  styling: "bcgov-border-background",
};
