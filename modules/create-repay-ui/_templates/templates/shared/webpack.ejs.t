---
to: <%=directory%>/<%=name%>/webpack.config.js
---
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = (config) => {
  config.plugins[0] = new HtmlWebpackPlugin({
    title: 'Prototype',
    meta: { viewport: 'width=device-width, height=device-height, initial-scale=1' },
    template: 'src/index.html',
  })
  return config
}
