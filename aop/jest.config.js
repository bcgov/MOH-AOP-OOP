module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: ["node_modules/(?!axios)"], //The 1.x.x version of axios changed the module type from CommonJS to ECMAScript. This option transpiles the module so Jest runs it
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest", // Update to match your installed version
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
};
