const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: ['babel-polyfill', './src/index.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  // The % refers to the global coverage of users from browserslist
                  browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
                },
              }],
            ],
          },

        },
      },
    ],
  },
  //     optimization: {
  //     minimize: false
  //   },
};
