/* eslint-disable import/no-import-module-exports */
import webpack from 'webpack';
import {merge} from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import EslintWebpackPlugin from 'eslint-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import baseWebpackConfig from './webpack.base.config';

const {PATHS} = baseWebpackConfig.externals;

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: process.env.APP_PORT || 3000,
    hot: true,
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.public}/index.html`,
      options: {
        minify: false,
      },
    }),
    new EslintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new StylelintPlugin(),
  ],
};

const devWebpackConfig = merge(config, baseWebpackConfig);

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
