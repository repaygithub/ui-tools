module.exports = getWebpackConfig

const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

function getWebpackConfig(input, { cwd, env, port }) {
  const isEnvProduction = env === 'production'
  const isEnvDevelopment = !isEnvProduction
  return {
    mode: isEnvProduction ? 'production' : 'development',
    devtool: 'cheap-module-source-map',
    entry: isEnvProduction
      ? input
      : [`webpack-dev-server/client?http://localhost:${port}/`, `webpack/hot/dev-server`, input],
    output: {
      path: path.resolve(cwd, 'dist'),
      filename: `[name].${isEnvProduction ? '[contenthash]' : 'bundle'}.js`, // add contenthash for production build
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [require.resolve('@repay/babel-preset')],
            },
          },
        },
        {
          test: /\.svg$/,
          use: [require.resolve('svg-sprite-loader'), require.resolve('svgo-loader')],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: {
            loader: require.resolve('file-loader'),
            options: {
              name: '[name].[ext]?[hash]',
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Prototype',
        meta: { viewport: 'width=device-width, height=device-height, initial-scale=1' },
      }),
      // for production use: new webpack.HashedModuleIdsPlugin() for proper cache naming
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // look into html-webpack-multi-build-plugin for production
      new SpriteLoaderPlugin(),
      isEnvProduction && new webpack.HashedModuleIdsPlugin(),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // added for when using `yarn link` can ensure a single library is resolved
      alias: {},
    },
  }
}
