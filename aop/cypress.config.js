import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    testIsolation: false, //to prevent Cypress errors
  },
});
