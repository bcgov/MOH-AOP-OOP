//if vite hosts in bypassLogin mode (eg. for e2e tests)
//this code enables both useDummyData and bypassLogin
//otherwise these features are not enabled
let bypassSwitch = false;
if (import.meta.env.MODE === "bypassLogin") {
  bypassSwitch = true;
}

export default {
  useDummyData: bypassSwitch,
  bypassLogin: bypassSwitch,
};
