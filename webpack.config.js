const path = require('path');
const glob = require('glob');
const { ProvidePlugin } = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (_env, argv) => {
  const { mode } = argv;
  const cwd = process.cwd();
  const src = path.resolve(cwd, 'src', 'components');
  const dest = path.resolve(cwd, 'lib');  

  const MODULES_LIST = ['tsx', 'ts'].reduce((list, ext) => {
    return list
      .concat(glob.sync(path.resolve(src, '**', `*.${ext}`)))
      .filter(item => !item.endsWith('.d.ts'));
  }, []);  

  return MODULES_LIST.map((m) => {
    const { name, dir } = path.parse(m);
    const dest_dir = path.relative(src, dir);

    const CONFIG = {
      mode,
      target: 'web',
      entry: {
        [name]: m,
      },
      resolve: {
        symlinks: true,
        extensions: ['.ts', '.tsx', '.js']
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
        filename: '[name].js',
        chunkFilename: `${name}.[chunkhash].js`,
        path: path.resolve(__dirname, dest, dest_dir),
        globalObject: 'globalThis',
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

    if (mode === 'development') {
      CONFIG.devtool = 'source-map';
    }
    
    return CONFIG;
  });
}