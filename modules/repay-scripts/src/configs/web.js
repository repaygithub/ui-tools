module.exports = getWebpackConfig

const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getBabelConfig = require('./babel')

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
      chunkFilename: `[name].${isEnvProduction ? '[contenthash]' : 'bundle'}.js`,
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.m?(j|t)sx?$/,
          include: /node_modules.*@fluent/,
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
          test: /\.(png|jpe?g|gif|svg)$/i,
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
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      isEnvProduction && new webpack.HashedModuleIdsPlugin(),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
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
