const webpack = require('webpack');
const path = require('path');

const BROWSER_DIR = path.join(process.cwd(), 'browser', 'app');
const STYLES_DIR = path.join(process.cwd(), 'browser', 'styles');

module.exports = {
  context: process.cwd(),
  cssnext: {
    browsers: 'last 2 versions'
  },
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './browser/app/entry.jsx'
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint',
      include: BROWSER_DIR
    }],
    loaders: [{
      test: /\.jsx?$/,
      include: BROWSER_DIR,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'cssnext'
      ]
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'build'),
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ExternalsPlugin('commonjs', ['electron', ...Object.keys(process.binding('natives'))])
  ],
  resolve: {
    extensions: ['', '.jsx', '.js'],
    alias: {
      'styles': STYLES_DIR,
      'app': BROWSER_DIR
    }
  }
};