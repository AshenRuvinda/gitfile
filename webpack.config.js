const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { electron: '25' } }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['tailwindcss', 'autoprefixer'],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    new webpack.EnvironmentPlugin({
      GENIUS_API_KEY: null,
      NODE_ENV: process.env.NODE_ENV || 'development',
    }),
    new webpack.ProvidePlugin({
      global: '@ungap/global-this',
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public'),
        publicPath: '/public',
      },
      {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/',
      },
    ],
    port: 8080,
    host: 'localhost',
    historyApiFallback: {
      index: '/index.html'
    },
    hot: true,
    liveReload: true,
    compress: true,
    open: false, // Don't auto-open browser
    allowedHosts: ['localhost', '127.0.0.1'],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    client: {
      logging: 'info',
      progress: true,
      reconnect: true,
    },
  },
  mode: 'development',
  target: 'electron-renderer',
  devtool: 'cheap-module-source-map',
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      fs: false,
      util: require.resolve('util/'),
      crypto: require.resolve('crypto-browserify'),
      assert: require.resolve('assert/'),
      os: require.resolve('os-browserify/browser'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  optimization: {
    splitChunks: false, // Disable code splitting for Electron
  },
};