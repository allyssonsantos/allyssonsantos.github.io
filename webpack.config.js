const path = require('path');

module.exports = {
  entry: ['./assets/js/backButton.js', './assets/js/masonry.js', './assets/js/register.js'],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'assets/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}