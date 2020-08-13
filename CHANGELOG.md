# Changelog

## [@repay/create-ui@v0.1.0](https://github.com/repaygithub/ui-tools/commit/d766030eb4514671b501fb1d28d1a724d6922f3c)

- feat(create-repay-ui): implement javascript testing tool in for the generated apps [4db044f](https://github.com/repaygithub/ui-tools/commit/4db044f1e65b603c523e05fcfb21fc78c6b829e9)
- feat(create-repay-ui): change jest config to its own file [58fae13](https://github.com/repaygithub/ui-tools/commit/58fae13a431a0263591f3435b3348a7d16b026e6)
- feat(create-repay-ui): implementation of the Layout Component [20669db](https://github.com/repaygithub/ui-tools/commit/20669db3a04573ca8e2e351f096dd1aa04335c9c)
- chore(create-repay-ui): upgrade Styled Components to v5 and add missing peer dependencies [f2ed965](https://github.com/repaygithub/ui-tools/commit/f2ed96552f154e653dc8e089ad44576d782d9095)
- feat(create-repay-ui): add global styles and replace loading text with spinner [f7533e2](https://github.com/repaygithub/ui-tools/commit/f7533e23fca778758a652014c29ff5e82ba5ea84)
- feat(create-repay-ui): use Cactus components in home page [efcf361](https://github.com/repaygithub/ui-tools/commit/efcf3619e25bc3653d87c9575734fed0657d0614)


## [@repay/eslint-config@v3.1.0](https://github.com/repaygithub/ui-tools/commit/3797641e014ef6f568956e40c97df6974b49df1a)

- feat(eslint-config): Add TS eslint config [2c4696b](https://github.com/repaygithub/ui-tools/pull/50/commits/2c4696b436fce9c521fc05c9c5e545274f7b0a2f)
- docs(eslint-config): Add documentation for extending our config for both JS & TS versions[8d288ec](https://github.com/repaygithub/ui-tools/pull/50/commits/8d288ec5932c4d8c654b3e776a19582151908943)
- fix(eslint-config): Add env, update plugins & rules [d2ecff5](https://github.com/repaygithub/ui-tools/pull/50/commits/d2ecff5b5425465567c020f811833ead9643fde3)


## [@repay/create-ui@v0.0.3](https://github.com/repaygithub/ui-tools/commit/111ae6b371c5b16e82016e1935ae5095528ab0a4)

- fix(create-repay-ui): add _templates folder to published package [f14416c](https://github.com/repaygithub/ui-tools/commit/f14416c36f572db959cdbe5f6c11251a2dc42362)


## [@repay/create-ui@v0.0.2](https://github.com/repaygithub/ui-tools/commit/3c98a3679016466cefd1b381e0e2512f10e30026)

- feat(create-repay-ui): create-ui now uses the latest version of repay-scripts. removed
webpack.config file [d2798a6](https://github.com/repaygithub/ui-tools/commit/d2798a6e059b9b3b2aee9d0486934e7d3a23a393)
- chore(create-repay-ui): upgrade execa and inquirer [252105f](https://github.com/repaygithub/ui-tools/commit/252105f8a0e44ad9fb50cbfef4aec1d9d54cc186)
- feat(create-repay-ui): implemented reach-router in create-ui [5cbf62c](https://github.com/repaygithub/ui-tools/commit/5cbf62c768cdcaacaead829e0b900548ee9baf00)
- chore(create-repay-ui): upgrade @repay/scripts [3ad0036](https://github.com/repaygithub/ui-tools/commit/3ad00364526bb0ba5157f421046849a22a2b0874)
- chore(create-repay-ui): upgrade eslint config [11bfd11](https://github.com/repaygithub/ui-tools/commit/11bfd11e6c73b0f50c323b09cdafc75e4eccfbbd)
- feat(create-repay-ui): implemented request api utility for create-repay-ui [9a1c0ed](https://github.com/repaygithub/ui-tools/commit/9a1c0ed4b8023943ffabebf94eb44ceba3ee53b2)
- chore(create-repay-ui): added styled-components [7fecd23](https://github.com/repaygithub/ui-tools/commit/7fecd23a8c695959e7a51b4fd58653e2100d123c)
- fix(create-repay-ui): added @repay/cactus-web to package.json [5690468](https://github.com/repaygithub/ui-tools/commit/569046851d56839d76780a8e42b0343d6b29df98)


## [@repay/eslint-config@v3.0.0](https://github.com/repaygithub/ui-tools/commit/8c546f590098f46a9f6f21affe7a377a8e493e71)

- chore(eslint-config): remove unused Babel dependencies [50b422f](https://github.com/repaygithub/ui-tools/pull/45/commits/50b422f9f451e08bc8d0232f6e4030075fe97b49)
- chore(eslint-config): upgrade react eslint plugins [4fa7d5c](https://github.com/repaygithub/ui-tools/pull/45/commits/4fa7d5c7797b4b6cd620691231e42cc0b9f33663)
- feat(eslint-config): change to new import sort plugin [f4cd412](https://github.com/repaygithub/ui-tools/pull/45/commits/f4cd412bbc80d2cbe11e88c5531dd2695e3bc0dd)
  - 🧨 BREAKING: We swapped out import sort plugins, so the linter's required import order has
changed


## [@repay/scripts@v2.0.0](https://github.com/repaygithub/ui-tools/commit/cc578296b43ecb41bea67669218dd3312e9140e8)

- fix(repay-scripts): add in missing peer dependencies for babel preset [aeba71f](https://github.com/repaygithub/ui-tools/commit/aeba71f125392d48d65bc61faa5a5c04e6a541d2)
- feat(repay-scripts): manually add CoreJS polyfills and use automatic regenerator polyfills [e4240b1](https://github.com/repaygithub/ui-tools/commit/e4240b138a002bbb6fc44b8a1677f1de5af63929)
  - 🧨 BREAKING: Polyfills for IE11 are now automatically added to all bundles behind the scenes
- chore(repay-scripts): remove unused svgo dependencies [f0ed1a9](https://github.com/repaygithub/ui-tools/commit/f0ed1a9c33c5dbac3f58ad8e98586cd46454cf29)
- chore(repay-scripts): upgrade babel dependencies to latest version [4b63775](https://github.com/repaygithub/ui-tools/commit/4b6377554c5549de8b0f90ed09659463a74ac1da)
- chore(repay-scripts): update dev dependencies [6debc56](https://github.com/repaygithub/ui-tools/commit/6debc56d8181c819c9a8f82f2044a11cf021cdcc)
- chore(repay-scripts): upgrade webpack loaders [2b231d5](https://github.com/repaygithub/ui-tools/commit/2b231d5cf2f2d3d0335a1f4ee5355b6c8d05171f)
- chore(repay-scripts): upgrade rollup and rollup plugins [7cef28f](https://github.com/repaygithub/ui-tools/commit/7cef28feeb7b459979611bd1f5a1c740634cbd33)
  - 🧨 BREAKING: Rollup was upgraded from v1 to v2, which could affect any custom Rollup configs
- chore(repay-scripts): upgrade webpack and wepback-dev-server [534c7c2](https://github.com/repaygithub/ui-tools/commit/534c7c28668919491be7737598c1a070330ee78d)
- chore(repay-scripts): upgrade yargs [c18b6a5](https://github.com/repaygithub/ui-tools/commit/c18b6a57e2574cd5aef222e2382e18632fe9032b)
- chore(repay-scripts): upgrade babel-preset dependency [319a930](https://github.com/repaygithub/ui-tools/commit/319a9300b3ff0eb904f1d07b06d95050607c5016)


## [@repay/babel-preset@v1.0.0](https://github.com/repaygithub/ui-tools/commit/a4093c1766b4a59b5dc19a1b2a9d84072f4853dc)

- fix(babel-preset): properly specify peer dependencies [6649eb9](https://github.com/repaygithub/ui-tools/commit/6649eb9b19f509342cbbd2c41916d86a323c7780)
- feat(babel-preset): split up polyfill option into coreJsPolyfill and regeneratorPolyfill [190f331](https://github.com/repaygithub/ui-tools/commit/190f3313ca86a0b68cef0cf28fb69ba9a9ce526c)
  - 🧨 BREAKING: The polyfill option has been replaced by coreJsPolyfill and regeneratorPolyfill.  Set both to true to mimic setting the previous polyfill option to true.
- chore(babel-preset): upgrade babel plugins and packages to latest version [430b727](https://github.com/repaygithub/ui-tools/commit/430b72777b1bdda4c37dd4bd50d9c338cf694988)


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
