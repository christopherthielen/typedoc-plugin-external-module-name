## Adding tests

The tests process the source code in `test/src` and then use Cypress.io
to assert that generated HTML is correct.

- Add any new tests into `test/cypress/integration/example_spec.js`
- Add any source code required by the test (which will be processed by TypeDoc) into `test/src`
- Run the integration tests using `yarn test`
  - `yarn test` relocates the `test` directory to a temporary folder to ensure `node_modules` isolation

## Test against a specific version of typedoc

#### Locally

```
TYPEDOC_VERSION=0.16.5 yarn test
```

#### Github Actions

- Add a new version of typedoc into the typedoc_versions matrix in .github/workflows/ci.yml
- Open a pull request and Github Actions will run
