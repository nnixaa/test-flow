const path = require('path');

module.exports = {
  entry: './extension/content/run.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'dist/test-flow')
  }
};
