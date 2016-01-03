const path = require('path');

const BROWSER_DIR = path.join(process.cwd(), 'browser', 'app');
const STYLES_DIR = path.join(process.cwd(), 'browser', 'styles');
const TEST_DIR = path.join(process.cwd(), 'spec', 'browser');

module.exports = {
  context: process.cwd(),
  debug: true,
  devtool: 'inline-source-map',
  entry: {},
  externals: {
    'electron': Object.keys(process.binding('natives'))
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'isparta-instrumenter',
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
        'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      ]
    }, {
      test: /\.jsx?$/,
      include: TEST_DIR,
      loader: 'babel'
    }]
  },
  output: {},
  resolve: {
    alias: {
      'styles': STYLES_DIR,
      'app': BROWSER_DIR
    },
    extensions: ['', '.js', '.jsx']
  }
};
