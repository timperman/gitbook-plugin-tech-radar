'use strict';

const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(__dirname, './dist');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let entry = ['./src/site.js'];

let plugins = [
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: true
    }),
    new webpack.optimize.OccurenceOrderPlugin()
];

module.exports = function(outputDir, publicPath, htmlFilename) {
  plugins.push(new HtmlWebpackPlugin({
    filename: htmlFilename ? htmlFilename : 'radar.html',
    chunks: 'app'
  }))

  return new Promise(function(resolve, reject) {
    var compiler = webpack({
      context: path.resolve('./node_modules/gitbook-plugin-tech-radar'),

      entry: entry,

      node: {
          fs: 'empty',
          net: 'empty',
          tls: 'empty'
      },

      output: {
          path: outputDir ? outputDir : buildPath,
          publicPath: publicPath ? publicPath : '/',
          filename: '[name].[hash].js'
      },

      resolve: {
        fallback: outputDir
      },

      module: {
          loaders: [
	      { test: /\.css/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap')},
              { test: /\.json$/, loader: 'json'},
              { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
              { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass') },
              { test: /\.(png|jpg|ico)$/, loader: 'file-loader?name=images/[name].[ext]&context=./src/images' }
          ]
      },

      quiet: false,
      noInfo: false,

      plugins: plugins
    })

    console.log("Compiling radar...")
    compiler.run(function(err, stats) {
      if ( err ) {
        console.log(err)
        reject(err)
      } else {
        if ( stats.hasErrors() ) {
          stats.toJson().errors.forEach(function(e) {
            console.log(e)
          })
        }
        resolve(stats)
      }
    })
  })
};
