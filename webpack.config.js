const { resolve } = require('path')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const config = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js',
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'static'),
    publicPath: '/static/',
  },

  context: resolve(__dirname, 'src'),

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/static/',
    historyApiFallback: true,
  },

  resolve: {
    modules: [resolve('src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      // {
      //     enforce: "pre",
      //     test: /\.jsx?$/,
      //     exclude: /node_modules/,
      //     loader: "eslint-loader"
      // },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      }
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: {
          configFile: resolve(__dirname, '.eslintrc'),
          cache: false,
        },
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    //        new CopyWebpackPlugin([{ from: 'vendors', to: 'vendors' }]),
    //     new OpenBrowserPlugin({url: 'http://localhost:8080'}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}

module.exports = config
