const path = require('path');
const { pack } = require('./index');

module.exports = function cmd_pack(args) {
  const src = args[1];
  
  if (!src) {
    console.error('Warning: You must specify the component folder to pack');
    require('./help');
    return;
  }

  const target = src.startsWith('/') 
    ? path.resolve(src) 
    : path.resolve(process.cwd(), src);

  pack({
    target,
    clean: true,
    mode: args.includes('--development') ? 'development' : 'production'
  });
}