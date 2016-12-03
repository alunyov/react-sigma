let webpack = require('webpack');
let yargs = require('yargs');
let { sigmaSrcRoot, sigmaDistRoot } = require('./paths')

let options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .argv;

let jsLoader = 'babel?cacheDirectory';

module.exports = {
  options: options,

  entry: {
    'main': sigmaSrcRoot + '/main.js',
    'webgl': sigmaSrcRoot + '/webgl.js',
    // add any extra sigma modules here
  },

  output: {
    path: sigmaDistRoot,
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
    library: 'Sigma',
    libraryTarget: 'umd',
  },

  externals: undefined,

  module: {
    loaders: [
      { test: /\.js/, loader: jsLoader, exclude: [/node_modules/,/sigma.*\/src/] },
      { test: /sigma.*\/src/, loader: 'imports?this=>window' },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
      }
    })
  ]
};