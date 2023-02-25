const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // arquivo onde fica o ReactDOM.render
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    // o [hash] serve para resolver problema de cache nos navegadores
    // como o navegado geralmente salva uns dados em cache, com isso ele vai achar
    // que é uma informação nova e renderizar novamente ao invés de usar o cache
    filename: 'bundle[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new CleanWebpackPlugin()
  ],
  // configuração das exportação
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ]
  },
  devServer: {
    port: 3000
  }
}