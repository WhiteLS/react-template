/* eslint-disable import/no-import-module-exports */
import webpack from 'webpack';
import {merge} from 'webpack-merge';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseWebpackConfig from './webpack.base.config';

const {PATHS} = baseWebpackConfig.externals;

const config: webpack.Configuration = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {removeAll: true},
            },
          ],
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${PATHS.public}/index.html`,
      options: {
        minify: true,
      },
    }),
  ],
};

const prodWebpackConfig = merge(config, baseWebpackConfig);

module.exports = new Promise((resolve) => {
  resolve(prodWebpackConfig);
});
