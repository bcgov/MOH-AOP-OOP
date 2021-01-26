import Table from "./Table.vue";
import { getTableElementsTestData } from "../../modules/tableTestData.js";

export default {
  title: 'Table',
  component: Table,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Table },
  template: '<Table v-bind="$props" />',
});

const header = "BCeID Info";
const tableData = getTableElementsTestData();
const basicTableElement = { name: "Key", value: "Value" };
const tableDataWithBoldValues = [{ ...basicTableElement, isValueBold: true }];
const tableDataWithBoldNames = [{ ...basicTableElement, isNameBold: true }];
const feesData = [
  { name: "Some Fees:", value: "$100.00", isValueBold: true },
  { name: "Some More Fees:", value: "$10.00", isValueBold: true },
  { name: "", value: "", isEmptyRow: true },
  { name: "Total Fees:", value: "$110.00", isValueBold: true },
];

export const WithHeader = Template.bind({});
WithHeader.args = {
  heading: header,
  elements: tableData,
};

export const WithoutHeader = Template.bind({});
WithoutHeader.args = {
  elements: tableData,
};

export const WithBlueStripe = Template.bind({});
WithBlueStripe.args = {
  elements: tableData,
  styling: "bcgov-blue-stripe",
};

export const WithBoldValues = Template.bind({});
WithBoldValues.args = {
  elements: tableDataWithBoldValues,
};

export const WithBoldNames = Template.bind({});
WithBoldNames.args = {
  elements: tableDataWithBoldNames,
};

export const WithFees = Template.bind({});
WithFees.args = {
  isFeesData: true,
  elements: feesData,
};
