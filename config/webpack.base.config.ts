import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import Dotenv from 'dotenv-webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

const PATHS = {
  root: path.resolve(__dirname, '../'),
  src: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build'),
  public: path.join(__dirname, '../public'),
};

interface WebpackConfig extends webpack.Configuration {
  externals: {PATHS: typeof PATHS};
}

const baseConfig: WebpackConfig = {
  context: PATHS.src,
  externals: {
    PATHS,
  },
  entry: {
    app: './index.tsx',
  },
  output: {
    path: PATHS.build,
    publicPath: '',
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components'),
      interfaces: path.resolve(__dirname, '../src/interfaces'),
      layouts: path.resolve(__dirname, '../src/layouts'),
      pages: path.resolve(__dirname, '../src/pages'),
      skeletons: path.resolve(__dirname, '../src/skeletons'),
      store: path.resolve(__dirname, '../src/store'),
      utils: path.resolve(__dirname, '../src/utils'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: `${PATHS.root}/.env`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.public}/favicon.ico`,
          to: PATHS.build,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
};

export default baseConfig;
