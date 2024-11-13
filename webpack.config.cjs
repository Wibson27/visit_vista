const path = require('path');

module.exports = {
  entry: './src/places-app.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'places-app.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']  // Allow importing without extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};