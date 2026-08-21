import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    allowCypressEnv: false,
    testIsolation: false, //to prevent Cypress errors
  },
});
