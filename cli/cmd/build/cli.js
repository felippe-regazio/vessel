const path = require('path');
const { build } = require('./index');

module.exports = function cli_builder(args) {
  const src = args[1];
  
  if (!src) {
    console.error('Warning: You must specify the component folder to build');
    require('./help');
    return;
  }

  const target = src.startsWith('/') 
    ? path.resolve(src) 
    : path.resolve(process.cwd(), src);

  build({
    target,
    clean: true,
    mode: args.includes('--production') ? 'production' : 'development'
  });
}