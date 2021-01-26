import Footer from "./Footer.vue";

export default {
  title: 'Footer',
  component: Footer,
};

const Template = () => ({
  components: { Footer },
  template: '<Footer />',
});

export const Basic = Template.bind({});
