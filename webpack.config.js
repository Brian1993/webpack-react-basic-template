const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env, arg) => {
  const isProdMode = arg.mode === 'production'

  const baseConfig = {
    entry: {
      main: './src/index.js',
      vendor: [
        'react',
        'redux',
        'lodash'
      ]
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            { 
             loader: 'file-loader',
             options: {
                outputPath: 'images/',
                name: '[hash].[name].[ext]',
                publicPath: 'images/'
              },
            },
            'image-webpack-loader'
          ],
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new htmlWebpackPlugin({ 
          template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: isProdMode ? 'styles/[chunkhash].[name].css' : 'styles/[name].css'
      })
    ],
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname,  'dist'),
      filename: '[chunkhash].[name].js',
      publicPath: '/'
    },
  }

   const devConfig = {
      devServer: {
        // contentBase: path.resolve(__dirname, 'dist'),
        port: 8080
      }
    }

    const prodConfig = {
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          })
        ]
      }
    }

    return isProdMode
      ? { ...baseConfig, ...devConfig }
      : { ...baseConfig, ...prodConfig }
}