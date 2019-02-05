'use strict'

const fs = require('fs')
const path = require('path')
const glob = require("glob")
const webpack = require("webpack")

module.exports = {
    entry: './components/vueInstance.js',
    //mode: 'production',
    mode:'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
                'scss': 'vue-style-loader!css-loader!sass-loader',
                'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
            }
          }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: { presets: [ 'es2015' ] }
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
          ]
        },
        {
            test: /\.(png|jpe?g|gif|svg|ico)$/,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
        },
        {
            test: /https:\/\/drive\.google\.com\/uc*/,
            loader: 'file-loader'
        },
        {
            test: /\.styl$/,
            loader: ['style-loader', 'css-loader', 'stylus-loader']
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        MODULES: path.resolve(__dirname, 'node_modules/'),
        CSS: path.resolve(__dirname, 'css/'),
        PRIZM: path.resolve(__dirname, 'themes/'),
        JS: path.resolve(__dirname, 'components/'),
        DATA: path.resolve(__dirname, 'data/'),
        PICTURES: path.resolve(__dirname, 'images/')
      }
    }
}
