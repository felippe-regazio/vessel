const path = require('path');
const webpack = require('webpack');
const { ProvidePlugin } = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = function bundle(mode, target) {
  const CONFIG = {
    mode,
    target: 'web',
    entry: {
      [target.name]: target.src
    },
    resolve: {
      symlinks: true,
      extensions: ['.ts', '.tsx', '.js'],
      modules: [ 
        path.resolve(__dirname, 'node_modules'),
        path.resolve(target.path, 'node_modules')
      ]
    },
    module: {
      rules: [          
        {
          test: /\.s[ac]ss$/i,
          use: [
            { 
              loader: 'css-loader', 
              options: {
                url: false,                  
                importLoaders: 1,
                sourceMap: mode === 'development'
              },
            },
            { 
              loader: 'sass-loader'
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: {  loader: 'ts-loader' }
        },
      ]
    },
    plugins: [
      new ProvidePlugin({ 
        WC: [ 'wcwc', 'WC' ] 
      })
    ],
    output: {
      path: target.dist,
      filename: '[name].js',
      globalObject: 'globalThis',
      chunkFilename: `${target.name}.[chunkhash].js`,
      library: {
        type: 'umd',
      }
    },
    optimization: {
      minimize: true,
      minimizer: [ 
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ]
    },
    externals: 'wcwc'
  }
  
  CONFIG.resolveLoader = CONFIG.resolve;

  if (mode === 'development') {
    CONFIG.devtool = 'source-map';
  }
  
  webpack(CONFIG, (error, stats) => {
    if (error) { return console.error(error) }

    const statsJson = stats.toJson('minimal');
    const printf = arr => arr.reduce((str, item, index) => `${str}\n(${++index}) ${item.message}\n`, '');

    if (statsJson.warnings?.length) {
      console.log('WARNINGS')
      console.warn(printf(statsJson.warnings));
    }

    if (statsJson.errors?.length) {
      console.log('ERRORS')
      console.error(printf(statsJson.errors));
    }

    console.log(`Done. Errors (${statsJson.errorsCount}), Warns (${statsJson.warningsCount})`);
  });
}