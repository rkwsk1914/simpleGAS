const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const GasPlugin = require('gas-webpack-plugin')
const Dotenv = require('dotenv-webpack')
// const Es3ifyPlugin = require('es3ify-webpack-plugin')

module.exports = (env, argument) => {
  console.info(env)
  console.info(argument)
  const MODE = /development|production/.test(argument.mode) ? argument.mode : 'production' // 'production' か 'development' を指定
  // const enabledSourceMap = MODE === 'production' // ソースマップの利用有無(productionのときはソースマップを利用しない)

  const CONFIG = {
    mode: MODE,
    entry: './src/main.ts',
    output: {
      path: `${__dirname}/dist`, //  出力ファイルのディレクトリ名
      filename: 'main.js' // 出力ファイル名
    },
    module: {
      rules: [
        { // 拡張子 .js もしくは .jsx の場合
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        { // 拡張子 .ts もしくは .tsx の場合
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader'
            },
            'ts-loader' // TypeScript をコンパイルする
          ]
        }
      ]
    },
    // import 文で .ts ファイルを解決するため
    // これを定義しないと import 文で拡張子を書く必要が生まれる。
    // フロントエンドの開発では拡張子を省略することが多いので、
    // 記載したほうがトラブルに巻き込まれにくい。
    resolve: {
      extensions: ['.ts', '.js', '.json'] // 拡張子を配列で指定
    },
    plugins: [
      new GasPlugin(),
      // new Es3ifyPlugin(),
      new ESLintPlugin({
        extensions: ['.ts', '.js'],
        fix: true,
        failOnError: true,
        quiet: true
      }),
      new Dotenv()
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            output: { comments: MODE !== 'production' },
            compress: { drop_console: MODE === 'production' }
          }
        })
      ]
    }
  }

  return CONFIG
}
