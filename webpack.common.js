const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/scripts/main.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './node_modules/font-awesome/fonts/*'),
        flatten: true,
        to: 'fonts/'
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.pug'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(pug)$/,
        use: ['pug-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /fonts\/*\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      styles: '../styles'
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  }
}
