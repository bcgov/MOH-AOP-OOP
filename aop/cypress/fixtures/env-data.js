// future code in case we add DEV/TESt environment tests
// if (Cypress.env("environment") === "test") {
//   envData.enableIntercepts = false;
// } else if (Cypress.env("environment") === "dev") {
//   envData.enableIntercepts = false;
// } else {
//   //local environment
//   envData.enableIntercepts = true;
// }

//switch to false if you need to test the live APIs
//otherwise leave true for test stability 
//(so API calls are intercepted in the CI pipeline)
export const enableIntercepts = true; 