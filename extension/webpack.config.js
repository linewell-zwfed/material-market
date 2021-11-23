'use strict';

const path = require('path');

/** @type {import("webpack").Configuration} */
const config = {
  target: 'node',
  entry: './src/extension.ts',
  output: {
    devtoolModuleFilenameTemplate: '../[resource-path]',
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'out'),
    clean: true
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  }
};

module.exports = config;