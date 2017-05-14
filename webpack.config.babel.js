const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    library: 'Requirements',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(pkg.version),
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
}
