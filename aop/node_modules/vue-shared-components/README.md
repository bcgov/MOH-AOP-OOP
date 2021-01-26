[![Maintainability](https://api.codeclimate.com/v1/badges/1ba70a859abfdade545b/maintainability)](https://codeclimate.com/github/bcgov/vue-shared-components/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/1ba70a859abfdade545b/test_coverage)](https://codeclimate.com/github/bcgov/vue-shared-components/test_coverage)

# vue-shared-components
A collection of vue components to build bcgov themed interfaces

## Getting started

In order for a project to use these components, add the latest [release](https://github.com/bcgov/vue-shared-components/releases) to the project's package.json. Example: (current release)

```
"dependencies": {
    ...
    "shared-components": "https://github.com/bcgov/vue-shared-components/releases/download/0.1.0/vue-shared-components-0.1.0.tgz",
    ...
},
```

## Creating a release

Run the following commands locally when ready to release:

```bash
yarn install
```

```bash
npm pack
```

Running the pack command will create a _shared-components-X.X.X.tgz_ file in the root level of the project that contains the components ready for consumption by any project.
