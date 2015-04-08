var webpack = require('webpack');
var config = {};

function generateConfig(name) {
  var standalone = name.indexOf('standalone') > -1;
  var uglify = name.indexOf('min') > -1;
  var config = {
    entry: './index.js',
    output: {
      path: 'dist/',
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'axios',
      libraryTarget: 'umd'
    },
    externals: [
      {
        './adapters/http': 'var undefined'
      }
    ],
    devtool: 'source-map'
  };
 
  if (standalone) {
    config.externals[0]['es6-promise'] = '{Promise: Promise}';
  }

  if (uglify) {
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    ];
  }

  return config;
}

['axios', 'axios.min', 'axios.standalone', 'axios.standalone.min'].forEach(function (key) {
  config[key] = generateConfig(key);
});

module.exports = config;
