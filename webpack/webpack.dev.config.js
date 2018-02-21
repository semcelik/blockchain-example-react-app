var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../app');

module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  entry: [
    path.join(parentDir, 'index.js'),
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.less$/,
      loaders: ["style-loader", "css-loader", "less-loader"]
    }
    ]
  },
  output: {
    path: parentDir + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true,
    hot: true,
    inline: true
  }
};