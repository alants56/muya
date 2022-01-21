const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const proMode = process.env.NODE_ENV === 'production'

exports.default = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../lib'),
      snapsvg: path.join(
        __dirname,
        '../lib/block/extra/diagram/renderer/sequence/snap.svg-min.js'
      )
    },
    fallback: { path: false }
  },

  module: {
    rules: [
      {
        test: require.resolve(
          path.join(
            __dirname,
            '../lib/block/extra/diagram/renderer/sequence/snap.svg-min.js'
          )
        ),
        use: 'imports-loader?this=>window,fix=>module.exports=0'
      },
      {
        test: /\.css$/,
        use: [
          proMode
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '/'
                }
              }
            : 'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      stage: 0
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: '/static/'
            }
          },
          'svgo-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'imgs/[name]--[folder].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name]--[folder].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name]--[folder].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      formatter: require('eslint-friendly-formatter')
    })
  ]
}
