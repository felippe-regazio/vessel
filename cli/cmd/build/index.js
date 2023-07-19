const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function getTargetInfo(target) {
  return {
    path: path.resolve(target),
    name: path.basename(target),
    dist: path.resolve(target, 'dist'),
    src: path.resolve(target, 'src', 'index.tsx'),
  }
}

function createWebpackConfig(info, mode) {
  const DEV_MODE = mode === 'development';

  const CONFIG = {
    mode,
    target: 'web',
    entry: {
      index: info.src,
      vessel: path.resolve(info.path, 'node_modules', 'vessel', 'lib', 'index.js'),
    },
    resolve: {
      symlinks: true,
      extensions: ['.ts', '.tsx', '.js'],
      modules: [ 
        path.resolve(info.path, 'node_modules'),
        path.resolve(__dirname, '..', '..', 'node_modules'),
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
                sourceMap: DEV_MODE
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
    output: {
      path: info.dist,
      filename: '[name].js',
      globalObject: 'globalThis',
      chunkFilename: `${info.name}.[chunkhash].js`,
      library: {
        type: 'umd',
      }
    },
    externals: ['vessel']
  }

  if (DEV_MODE) {
    Object.assign(CONFIG, {
      devtool: 'source-map'
    });
  }

  if (!DEV_MODE) {
    Object.assign(CONFIG, {
      devtool: 'nosources-source-map',
      optimization: {
        minimize: true,
        minimizer: [ 
          new TerserPlugin(),
          new CssMinimizerPlugin(),
        ]
      }    
    });
  }

  CONFIG.resolveLoader = CONFIG.resolve;  

  return CONFIG;
}

function build(options) {
  const { target, mode, clean } = options;
  const info = getTargetInfo(target);
  const compiler = webpack(createWebpackConfig(info, mode));

  console.log(`Building → ${info.path}\n`);

  if (clean) {
    fs.rmSync(info.dist, { recursive: true, force: true });  
  }

  if (mode === 'production') {
    compiler.run((error, stats) => {
      if (error) { 
        console.error(`Compiler error: ${error}`);
        return compiler.close(error => (error && console.error));
      }
  
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
      compiler.close(error => (error && console.error))
    });
  }

  if (mode === 'development') {
    const server = new WebpackDevServer({ 
      open: true,
      static: path.resolve(info.path, 'test')
    }, compiler);

    const runServer = async () => {
      console.log('Starting server...');
      await server.start();
    };

    runServer();    
  }
}

// ---------------------------------------------------------------------

module.exports = {
  build,
  getTargetInfo,
  createWebpackConfig
};