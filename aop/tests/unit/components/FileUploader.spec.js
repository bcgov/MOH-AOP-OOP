import { mount } from "@vue/test-utils";
import Component from "@/components/file-uploader/FileUploader.vue";

describe("ProvinceInput.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});