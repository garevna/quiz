'use strict'

// const fs = require('fs')
const path = require('path')
// const glob = require("glob")
const webpack = require("webpack")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const VuetifyLoaderPlugin = require ( 'vuetify-loader/lib/plugin' )


module.exports = {
    entry: './components/vueInstance.js',
    //mode: 'production',
    // mode:'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/public/',
        chunkFilename: '[name].js'
    },
    // optimization: {
    //     splitChunks: {
    //       cacheGroups: {
    //         default: false,
    //         vendors: false,
    //         common: {
    //           chunks: 'all',
    //           test: /node_modules\/vue\/dist/
    //         },
    //         vendor: {
    //             chunks: 'all',
    //             test: /node_modules/
    //         },
    //       }
    //     }
    // },
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
            exclude: /\/node_modules\//
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?.*)/,
          use: {
            loader: 'file-loader',
            options: {
              name: `[path][name].[ext]`,
            }
          }
        },
        {
          test: /\.(sa|sc)ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              // Requires sass-loader@^7.0.0
              options: {
                implementation: require('sass'),
                fiber: require('fibers'),
                indentedSyntax: true // optional
              },
              // Requires sass-loader@^8.0.0
              options: {
                implementation: require('sass'),
                sassOptions: {
                  fiber: require('fibers'),
                  indentedSyntax: true // optional
                },
              },
            },
          ],
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
            loader: 'file-loader',

        },
        {
            test: /\.styl$/,
            loader: ['style-loader', 'css-loader', 'stylus-loader']
        }
      ],
      noParse: [
        /\/node_modules\/vue\/dist\/*.js/,
        /\/node_modules\/vuex\/dist\/*.js/,
        /\/node_modules\/vuetify\/dist\/*.js/
      ]
    },
    devServer: {
        stats: 'errors-only'
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.common.js',
        MODULES: path.resolve(__dirname, 'node_modules/'),
        CSS: path.resolve(__dirname, 'css/'),
        PRIZM: path.resolve(__dirname, 'themes/'),
        JS: path.resolve(__dirname, 'components/'),
        DATA: path.resolve(__dirname, 'data/'),
        PICTURES: path.resolve(__dirname, 'images/'),
      },
      modules: [
        path.join( __dirname, "components" ),
        "/quiz/public",
        "node_modules"
      ]
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new VuetifyLoaderPlugin({
        match (originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith('core-')) {
            return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
          }
        }
      }),
      new webpack.ProvidePlugin({
        Vue: ['vue/dist/vue.common.js']
      })
      // new webpack.optimize.SplitChunksPlugin({
      //       cacheGroups: {
      //           commons: {
      //               // Omitting test selects all modules
      //               test: /[\\/]node_modules[\\/]/,
      //               name: 'shared',
      //               chunks: 'initial',
      //               minChunks: Infinity
      //           }
      //       }
      //   }),
        // new webpack.optimize.SplitChunksPlugin({
        //     cacheGroups: {
        //         vendor: {
        //             name: 'runtime',
        //             chunks: 'async'
        //         }
        //     }
        // }),
    ]
}
