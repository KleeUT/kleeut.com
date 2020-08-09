# [kleeut.com](https://kleeut.com)

A simple static page about Klee Thomas, available at [kleeut.com](https://kleeut.com)

# Development

This site is built with Gatsby 2.

To build locally

```bash
npm install
npm run develop
```

# Continuous integration

Gatsby build, linting and prettier are run on every branch push via Github Actions.

# Production Builds

When deployed to the `main` branch the CI step is run and then the code is deployed to S3.
