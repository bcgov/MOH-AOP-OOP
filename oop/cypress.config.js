import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    experimentalRunAllSpecs: true,
    testIsolation: false, //to prevent Cypress errors
  },
});
