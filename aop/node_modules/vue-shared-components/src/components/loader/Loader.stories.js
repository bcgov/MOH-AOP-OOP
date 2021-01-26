import Loader from "./Loader.vue";

export default {
  title: 'Loader',
  component: Loader,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Loader },
  template: '<Loader v-bind="$props" />',
});

const ContainerTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Loader },
  template: `
    <div class="test-container">
      <Loader v-bind="$props" />
    </div>
  `
});

export const PageLevel = Template.bind({});
PageLevel.args = {
  page: true,
};

export const Container = ContainerTemplate.bind({});
Container.args = {};
