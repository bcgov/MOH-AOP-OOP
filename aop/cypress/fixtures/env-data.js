let envData = {
  enableIntercepts: true,
};

if (Cypress.expose("environment") === "test") {
  envData.enableIntercepts = false;
} else if (Cypress.expose("environment") === "dev") {
  envData.enableIntercepts = false;
} else {
  //local environment
  envData.enableIntercepts = true;
}

//uncomment to override
//switch to false if you need to test the live APIs
//otherwise leave true for test stability
//(so API calls are intercepted in the CI pipeline)
// envData.enableIntercepts = true;

export const enableIntercepts = envData.enableIntercepts;
