# Changelog

## [@repay/eslint-config@v2.1.0](https://github.com/repaygithub/ui-tools/commit/5d09d99b8a020a732fd235a7eb96e3acba76eb32)

- build(eslint-config): upgrade eslint [74b6ad6](https://github.com/repaygithub/ui-tools/commit/74b6ad69b12d669e923856899e5cb0abfb7a997e)
- build(eslint-config): remove prettierrc [d85197d](https://github.com/repaygithub/ui-tools/commit/d85197d10aa8f970490902d112446c6d5d82049e)
- fix(eslint-config): upgrade babel-eslint to avoid no-unused-vars bug [2dcf074](https://github.com/repaygithub/ui-tools/commit/2dcf074f3d9120dcc1e416ec8b51469c2ebf4206)

## [@repay/scripts@v1.0.0](https://github.com/repaygithub/ui-tools/commit/58393c088810ed03c229c67402bb12d711fd26c4)

- chore(repay-scripts): upgrade html-webpack-plugin to 4.3.0 [0b031cc](https://github.com/repaygithub/ui-tools/commit/0b031cc57b29105bd135ed79bd8d3c6ecbbea7f1)
- feat(repay-scripts): add cli arg to pass custom html template [197bf82](https://github.com/repaygithub/ui-tools/commit/197bf8236e03f4f8d008de0f276369c6740af86f)
- feat(repay-scripts): default html template to src/index.html [eda534c](https://github.com/repaygithub/ui-tools/commit/eda534c02b4dd8da4aa55b85ed7fa453c2dda6b4)
- docs(repay-scripts): update docs to include info about the html-template arg [ece372e](https://github.com/repaygithub/ui-tools/commit/ece372e5c9891fbe57fba6c6f1f3f9680fbbde17)


## [@repay/scripts@v0.5.0](https://github.com/repaygithub/ui-tools/commit/022ba0873cd8714629000c0a354ae6fc16ff6238)

- feat(repay-scripts): add loaders for CSS and FTL files to default Webpack config [4a03515](https://github.com/repaygithub/ui-tools/commit/4a035158bce1f5844037440652572762e6d9a0e7)
  - 🧨 BREAKING: CSS and FTL files will now be processed through loaders in the default Webpack
config
- feat(repay-scripts): add --watch arg to build command [d11de27](https://github.com/repaygithub/ui-tools/commit/d11de2713fd8a8869f55011682b1c92554583862)
- feat(repay-scripts): add ability to use async config functions in dev command [e1ef183](https://github.com/repaygithub/ui-tools/commit/e1ef1838f71922ebe62727ff133e96fb200a79e3)
- fix(repay-scripts): fix path to css/style loaders and use new css loader API [d57fd74](https://github.com/repaygithub/ui-tools/commit/d57fd74e4a0d9b5367862feb2349bbfe8fbaa6f9)


## [@repay/eslint-config@v2.0.0](https://github.com/repaygithub/ui-tools/commit/d13f67a14439253b9261edef9704171269aa5e0f)

- feat(eslint-config): upgrade Prettier to v2 [490289d](https://github.com/repaygithub/ui-tools/commit/490289d22c3500208b1b2245d37d2a1d41c7498f)
  - 🧨 BREAKING: Peer dependency of eslint is now >=2.0.0.  This version has a few
syntax changes.  The most notable one is that single-argument arrow functions will now have parens
around the argument.

## [@repay/scripts@v0.4.0](https://github.com/repaygithub/ui-tools/commit/1b89c4c03d678e3fadbf62880ebd11f385e16aad)

- feat(repay-scripts): pass all Fluent modules through Babel by default [ce3df35](https://github.com/repaygithub/ui-tools/commit/ce3df35fd87e8de0641c207e2a1fa1d48469b5c6)
  - 🧨 BREAKING: During Webpack builds (non-lib), all @fluent node_modules will be transpiled by Babel by default.

## [@repay/scripts@v0.3.2](https://github.com/repaygithub/ui-tools/commit/2a9ce3b271310a31862c72445f26c988fd24b9eb)

- chore: upgrade dependencies [da4b94a](https://github.com/repaygithub/ui-tools/commit/da4b94a64846821b9d6d7d4fb74d48a8b31517ac)
- fix(repay-scripts): consider nested resource as external [dfb8fd0](https://github.com/repaygithub/ui-tools/commit/dfb8fd01212091307cd794bcb30beb6c2fa3b315)
- chore(): upgrade dependencies [a59081e](https://github.com/repaygithub/ui-tools/commit/a59081e1ce36e3eea4f5fbe44c1e3dc30654927f)

## [@repay/babel-preset@v0.3.0](https://github.com/repaygithub/ui-tools/commit/91a43e017f3eaf4e9aaab88237437bbb734c9e75)

- feat(babel-preset): use es modules in transforms [d8c39e7](https://github.com/repaygithub/ui-tools/commit/d8c39e7efde9f5c8adb4893430c1a78e171c3e48)
- style(babel-preset): remove commented code [bdc4b81](https://github.com/repaygithub/ui-tools/commit/bdc4b81a55cada78c006bff099c06544c230cb11)
- chore(): upgrade dependencies [a59081e](https://github.com/repaygithub/ui-tools/commit/a59081e1ce36e3eea4f5fbe44c1e3dc30654927f)
  - 🚨 **BREAKING**
- feat(babel-preset): add polyfill and useHelpers options [6b8231f](https://github.com/repaygithub/ui-tools/commit/6b8231fd1a3a0e0bdb4ea99789d81e33728710c6)

## [@repay/scripts@v0.3.1](https://github.com/repaygithub/ui-tools/commit/ad3dbdb5b84b077707d8b9343dc4eac9c3b7bd8e)

- fix(repay-scripts): only warn when tree-shaking enabled (#20) [32cbe18](https://github.com/repaygithub/ui-tools/commit/32cbe18ebfcdc41f98a2606d70f1d326b36528ac)
- docs(repay-scripts): add documentation for tree-shaking [28f93c4](https://github.com/repaygithub/ui-tools/commit/28f93c49166de48f9b61419c0f7047eafadd3572)

## [@repay/scripts@v0.3.0](https://github.com/repaygithub/ui-tools/commit/34bf480783d47b25fbc53d3195366d2c6a55ce0e)

- feat(repay-scripts): adds --tree-shaking option for libraries [1b09887](https://github.com/repaygithub/ui-tools/commit/1b09887e007e2fdc76f68b7dab83ddb35fc3b482)
- fix(repay-scripts): remove unused plugin [675eaee](https://github.com/repaygithub/ui-tools/commit/675eaee2f2301c3acc3c2a0765649164312a8afe)
- docs(repay-scripts): improve optimization docs [cbef62f](https://github.com/repaygithub/ui-tools/commit/cbef62f0943c8c084a34a659e9e8aeb570e2a17e)
- feat(repay-scripts): adds optimization via runtime spliting [5fc3a81](https://github.com/repaygithub/ui-tools/commit/5fc3a8137c86988a56c0ebcee6ee99f6b79d7ade)
- feat(repay-scripts): remove support for svg sprites [7372bc6](https://github.com/repaygithub/ui-tools/commit/7372bc636716ceccc083c7464ae42b5f78c71194)
  - 🚨 **BREAKING**
- _Beginning of Changelog_
