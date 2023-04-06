# AOP

This directory contains the code for the frontend portion of the Assignment of Payment application. It is deployed on OpenShift, to learn more about this refer to [the docs](https://github.com/bcgov/MOH-MSP-Enrolment/blob/main/doc/Overview.md).
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Dev Settings
To more easily move through the application during development, and bypass things like BCSC auth, adjust the settings in `src/settings.js`. The E2E test suite won't pass unless you temporarily set both "useDummyData" and "bypassLogin" to true.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
