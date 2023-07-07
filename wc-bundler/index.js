const path = require('path');
const bundle = require('./bundle');

const cwd = process.cwd();
const mode = 'development';
const args = process.argv.slice(2);

args.forEach(item => {
  bundle(mode, {
    name: item,
    path: path.resolve(cwd, item),
    dist: path.resolve(cwd, item, 'dist'),
    src: path.resolve(cwd, item, 'src', 'index.tsx'),
  })
});