import Sidecard from "./Sidecard.vue";
import CardAccountDetails from 'mdi-vue/CardAccountDetails.vue';

const sidecardData = {
  heading: "Heading",
  content: "This is where I put my content for the sidecard",
  type: "blue"
};

export default {
  title: 'Sidecard',
  component: Sidecard,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Sidecard },
  template: '<Sidecard v-bind="$props" />',
});

export const Blue = Template.bind({});
Blue.args = sidecardData;

export const Grey = Template.bind({});
Grey.args = { ...sidecardData, type: "grey" };

export const BlueGrey = Template.bind({});
BlueGrey.args = { ...sidecardData, type: "bluegrey" };

export const WithIcon = Template.bind({});
WithIcon.args = { ...sidecardData, type: "bluegrey", icon: CardAccountDetails };
