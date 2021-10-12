module.exports = getWebpackConfig

const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getBabelConfig = require('./babel')

function getWebpackConfig(input, { cwd, env, port, template }) {
  const isEnvProduction = env === 'production'
  const templateExists = fs.existsSync(path.join(process.cwd(), template))
  const polyfilledInput = [require.resolve('core-js/stable'), input]
  return {
    mode: isEnvProduction ? 'production' : 'development',
    devtool: 'cheap-module-source-map',
    entry: isEnvProduction
      ? polyfilledInput
      : [`webpack-dev-server/client?http://localhost:${port}/`, ...polyfilledInput],
    output: {
      path: path.resolve(cwd, 'dist'),
      filename: `[name].${isEnvProduction ? '[contenthash]' : 'bundle'}.js`, // add contenthash for production build
      chunkFilename: `[name].${isEnvProduction ? '[contenthash]' : 'bundle'}.js`,
      publicPath: '/',
      assetModuleFilename: '[name].[contenthash][ext][query]',
    },
    target: ['web', 'es5'],
    module: {
      rules: [
        {
          test: /\.m?(j|t)sx?$/,
          include: /node_modules.*@fluent/,
          type: 'javascript/auto',
          use: {
            loader: require.resolve('babel-loader'),
            options: getBabelConfig(),
          },
        },
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules\/(?!@fluent)/,
          use: {
            loader: require.resolve('babel-loader'),
            options: getBabelConfig(),
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: require.resolve('style-loader'),
            },
            {
              loader: require.resolve('css-loader'),
              options: {
                sourceMap: true,
                modules: { localIdentName: '[name]__[local]___[hash:base64:5]' },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.ftl$/,
          type: 'asset/source',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Prototype',
        meta: templateExists
          ? {}
          : { viewport: 'width=device-width, height=device-height, initial-scale=1' },
        template: templateExists ? template : 'auto',
      }),
      new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
    ].filter(Boolean),
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // added for when using `yarn link` can ensure a single library is resolved
      alias: {},
    },
    optimization: {
      // always creates a separate bundle for the runtime
      runtimeChunk: 'single',
      // available to add cacheGroups to separate big libraries into bundles
      splitChunks: {},
    },
  }
}
